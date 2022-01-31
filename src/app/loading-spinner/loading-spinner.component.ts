import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit {
  isUserEmailLoggedIn!: boolean;
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((userData: any) => {
      console.log(userData);
      if (userData) {
        this.isUserEmailLoggedIn = true;
        this.router.navigate([`/${userData.role}`]);
        console.log('user data = ', userData);
      } else this.isUserEmailLoggedIn = false;
    });
  }
}
