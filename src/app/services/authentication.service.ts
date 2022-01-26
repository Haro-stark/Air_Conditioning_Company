import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authState!: Observable<any> | any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
  ) {}

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
    );
    this.authState = user;
    return this.authState;
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
}
