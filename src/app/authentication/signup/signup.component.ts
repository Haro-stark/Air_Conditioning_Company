import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  username = '';
  errorMessage = '';
  role = '';
  error: { name: string; message: string } = { name: '', message: '' };

  resetPassword = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSignUp(): void {
    this.clearErrorMessage();

    if (this.validateForm(this.email, this.password)) {
      this.authService
        .signUp(this.email, this.password, this.role, "")
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch((_error: { name: string; message: string }) => {
          this.error = _error;
          this.router.navigate(['/']);
        });
    }
  }
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }


  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
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

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP =
      /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (email.length === 0 && !EMAIL_REGEXP.test(email)) {
      return false;
    }

    return true;
  }
}
