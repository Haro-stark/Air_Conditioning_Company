import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    console.log(authService.authState);
    if (true) {
      this.isLoggedIn = true;
    } else {
      console.log('not logged in');
    }
  }

  ngOnInit(): void { }

  signOut(): void {
    try {
      this.authService
        .signOut()
        .then(() => this.router.navigate(['/home']))
        .catch((error) => {
          window.alert(error);
          this.router.navigate(['/']);
        });
      this.isLoggedIn = false;
    } catch (err: any) {
      window.alert('error during sign in ' + err.message);
    }
  }
}
