import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-url-not-found',
  templateUrl: './url-not-found.component.html',
  styleUrls: ['./url-not-found.component.css'],
})
export class UrlNotFoundComponent implements OnInit {
  redirectToUrl!: string;

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter((e) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: any[]) => {
        console.log(events);
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
        this.redirectToUrl = events[0].urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    console.log(this.redirectToUrl);
    if (this.redirectToUrl) {
      this.router.navigate([this.redirectToUrl]);
    } else {
      this.authService.user$.subscribe({
        next: (userData) => {
          console.log(userData);
          if (userData) {
            this.router.navigate([`/${userData.role}`]);
            console.log('user data = ', userData);
          } else {
            console.log('sign out ,,,,,....');
            this.authService.signOut();
            this.router.navigate(['login']);
          }
        },
        error: (error: any) => {
          console.log(error);
          this.router.navigate(['login']);
        },
      });
    }
  }
}
