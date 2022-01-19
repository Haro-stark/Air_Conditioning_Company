import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

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
  error: { name: string; message: string } = { name: '', message: '' };
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      console.log('login already');
      this.router.navigate(['/home']);
    } else {
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
          this.SigningIn = false;
          this.router.navigate(['/home']);
        })
        .catch((_error) => {
          console.log(_error);
          this.error = _error;
          this.SigningIn = false;
          this.router.navigate(['/login']);
        });
    } else {
      this.SigningIn = false;
    }
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
