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
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  user$: Observable<User | undefined | null>;
  authState!: Observable<any> | any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    console.log('calling service constructor:-------- ');
    console.log(this.angularFireAuth, this.afs, this.router);

    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  ngOnInit(): void {
    console.log(this.angularFireAuth, this.afs, this.router);
  }

  async signUp(
    email: string,
    password: string,
    role: string,
    username: string
  ) {
    try {
      const singupStatus = await this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .then((credential) => {
          let user: User = {
            uid: credential.user?.uid,
            role: role,
            username: username,
            email: credential.user?.email,
          };
          console.log('user after signup : ', user);
          this.updateUserData(user);
        });

      // if (singupStatus.user) console.log("auth service signup: singupStatus = ", singupStatus.credential);
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

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      role: user.role,
    };
    return userRef.set(data, { merge: true });
  }

  async signOut() {
    try {
      const signOut = await this.angularFireAuth
        .signOut()
        .then(() => this.router.navigate(['/']));
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
