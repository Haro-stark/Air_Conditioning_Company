import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { faBars, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  faBarsIcon = faBars;
  faMinusIcon = faMinus;
  displaySideBar: boolean = false;
  loading = false;
  constructor(private router: Router,private authService: AuthenticationService) {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.loading = true;
  }

  ngOnInit(): void {
    this.loading = false;
  }

  toggleSidebar() {
    console.log('Toggling sidebar,', this.displaySideBar);
    this.displaySideBar = !this.displaySideBar;
    return this.displaySideBar;
    console.log('Toggled sidebar,', this.displaySideBar);
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
     
        this.loading = false;
      }, 2000);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        // here
        this.loading = false;
      }, 2000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        // here
        this.loading = false;
      }, 2000);
    }
  }

  signout(): void {
    this.authService.signOut();
  }
}
