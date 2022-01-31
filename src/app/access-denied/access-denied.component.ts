import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent implements OnInit {
  isLoggedIn!: boolean;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/404']);
  }
  signOut(): void {
    try {
      this.authService
        .signOut()
        .then(() => this.router.navigate(['/login']))
        .catch((error: any) => {
          window.alert(error);
          this.router.navigate(['/']);
        });
    } catch (err: any) {
      window.alert('error during sign in ' + err.message);
    }
  }
}
