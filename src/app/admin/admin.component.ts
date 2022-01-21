import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  displaySideBar: boolean = true;
  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    console.log('Toggling sidebar,',this.displaySideBar);
    this.displaySideBar = !this.displaySideBar;
    return this.displaySideBar;
  }
}
