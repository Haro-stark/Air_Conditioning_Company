import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { first, switchMap } from 'rxjs/operators';
import { getDatabase, ref, set } from 'firebase/database';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  user$: Observable<User | undefined | null>;
  authState!: Observable<any> | any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private httpService: HttpService
  ) {
    console.log('calling service constructor:-------- ');
    console.log(this.angularFireAuth, this.afs, this.router);

    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log('user is available',user)
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          console.log('user is not available')
          return of(null);
        }
      })
    );

  }
  ngOnInit(): void {
    console.log(this.angularFireAuth, this.afs, this.router);
    console.log(this.isUserEmailLoggedIn);
  }

  async signUp(
    email: string,
    password: string,
    role: string,
    username: string
  ) {
    try {
      await this.httpService
        .createEmployeeInFirebase(email, password)
        .subscribe({
          next: (response: { data: { uid: any; email: any } }) => {
            console.log('user record = ', response.data);
            let user: User = {
              uid: response.data.uid,
              role: role,
              username: username,
              email: response.data.email,
              password: password,
            };
            this.updateUserData(user);
          },
        });
    } catch (err: any) {
      window.alert(err.message);
    }
  }

  async deleteEmployeeInFirebase(email: string) {
    try {
      let uid: string;
      await this.httpService.getUserUid(email).subscribe({
        next: async (responseUid: any) => {
          console.log('Response after getting uid = ', responseUid);
          uid = responseUid.data;
          await this.httpService.deleteEmployeeInFirebase(uid).subscribe({
            next: (responseDeleteUser: any) => {
              console.log('Response after deletion = ', responseDeleteUser);
              return responseDeleteUser;
            },
          });
          return responseUid;
        },
      });
    } catch (err: any) {
      window.alert(err.message);
    }
  }
  get isUserEmailLoggedIn(): boolean {
    console.log('is logged in', this.authState);
    if (this.authState !== null && this.authState) {
      console.log(this.authState, !this.authState);
      return true;
    } else {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((credential) => {
        // this.updateUserData(credential.user);
        console.log(credential);
      });
    this.authState = user;
    return this.authState;
  }

   updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      role: user.role,
      password: user.password,
    };
    userRef.set(data, { merge: true });
  }

  async signOut() {
    try {
      const signOut = await this.angularFireAuth
        .signOut()
        .then(() => this.router.navigate(['/login']));
      console.log('signed out', signOut);
      this.authState = signOut;
    } catch (err: any) {
      window.alert('error during sign in ' + err.message);
    }
  }

  // async isUserLoggedIn(): Promise<unknown> {
  //   // if (await AngularFireAuth) return true;
  //   // else return false;
  //   return this.angularFireAuth.authState.pipe(first()).toPromise();
  // }

  isAllowedToAdminAndOfficer(user: User): boolean {
    const allowed = ['officer', 'admin'];
    return this.checkAuthorization(user, allowed);
  }
  isAllowedToAssistantAndOfficer(user: User): boolean {
    const allowed = ['officer', 'assistant'];
    return this.checkAuthorization(user, allowed);
  }
  isAllowedToAssistant(user: User): boolean {
    const allowed = ['assistant'];
    return this.checkAuthorization(user, allowed);
  }
  isAllowedToOfficer(user: User): boolean {
    const allowed = ['officer'];
    return this.checkAuthorization(user, allowed);
  }

  isAllowedToAdmin(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.role == role) {
        return true;
      }
      // if (role === "admin" && user.role.admin) { return true }
      // else if (role === "editor" && user.roles.editor) { return true }
      // else if (role === "subscriber" && user.roles.editor) { return true; }
    }
    return false;
  }
}
