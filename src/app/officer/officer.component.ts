import { Component, OnInit } from '@angular/core';
import { faBars, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.css'],
})
export class OfficerComponent implements OnInit {
  faBarsIcon = faBars;
  faMinusIcon = faMinus;
  displaySideBar: boolean = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}
  toggleSidebar() {
    console.log('Toggling sidebar,', this.displaySideBar);
    this.displaySideBar = !this.displaySideBar;
    return this.displaySideBar;
  }
  signout(): void {
    this.authService.signOut();
  }
}
