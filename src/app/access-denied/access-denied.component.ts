import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent implements OnInit {
  router: any;
  isLoggedIn!: boolean;
  constructor(private authService:AuthenticationService) {}

  ngOnInit(): void {}
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
