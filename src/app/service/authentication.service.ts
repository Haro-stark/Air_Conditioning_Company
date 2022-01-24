import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Roles } from '../models/Roles';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user$: Observable<User | undefined | null>
  authState!: Observable<any> | any;
  private user: User | null | undefined;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private zone: NgZone
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      }))
  }

  async signUp(email: string, password: string) {
    try {
      const singupStatus =
        await this.angularFireAuth.createUserWithEmailAndPassword(
          email,
          password
        );
      if (singupStatus.user) console.log(singupStatus.credential);
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

    const user = await this.angularFireAuth.signInWithEmailAndPassword(
      email,
      password
    ).then((credential) => {
      this.user$.subscribe(userData => this.user = userData)
      this.updateUserData(credential.user)
    });
    this.authState = user;
    return this.authState;
  }


  updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        admin: true
      },
    }
    return userRef.set(data, { merge: true })
  }

  async signOut() {
    try {
      const signOut = await this.angularFireAuth.signOut();
      console.log('signed out', signOut);
      this.authState = signOut;
    } catch (err: any) {
      window.alert('error during sign in ' + err.message);
    }
  }


  isAuthorized() {
    return !!this.user;
  }

  hasRole(role: Roles) {
    return this.isAuthorized() && this.user?.role === role;
  }



  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }



  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles.admin) {
        return true
      }
    }
    return false
  }
}
