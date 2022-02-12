import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  SigningIn: Boolean = false;
  isUserEmailLoggedIn!: Boolean;
  error: { name: string; message: string } = { name: '', message: '' };
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.isUserEmailLoggedIn);
    this.authService.user$.subscribe((userData) => {
      if (userData) {
        this.SigningIn = false;
        this.isUserEmailLoggedIn = true;
        this.router.navigate([`/${userData.role}`]);
      } else this.isUserEmailLoggedIn = false;
    });
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      console.log('login already');
      this.isUserEmailLoggedIn = true;
      this.router.navigate(['/login']);
    } else {
      this.isUserEmailLoggedIn = false;
      console.log('not logged in');
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  onLoginEmail(): void {
    this.clearErrorMessage();
    this.SigningIn = true;
    console.log('inside login');
    if (this.validateForm(this.email, this.password)) {
      this.authService
        .login(this.email, this.password)
        .then(() => {
          this.authService.user$.subscribe((userData) => {
            if (userData) {
              this.SigningIn = false;
              this.isUserEmailLoggedIn = true;
              if (userData.role == 'admin') {
                this.router.navigate([`/admin/employees`]);
              } else {
                this.router.navigate([`/${userData.role}`]);
              }
            }
          });
        })
        .catch((_error) => {
          console.log('error while logging in: ', _error);
          this.error = _error;
          this.SigningIn = false;
          this.router.navigate(['/login']);
        });
    } else {
      this.SigningIn = false;
    }
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => (this.isUserEmailLoggedIn = false))
      .catch((_error) => (this.error = _error));
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0 || !email) {
      this.errorMessage = 'Please enter Email!';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!';

      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!';
      return false;
    }

    this.errorMessage = '';

    return true;
  }
}
