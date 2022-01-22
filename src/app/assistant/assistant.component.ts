import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkLog } from '../models/WorkLog';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {
  displaySideBar: boolean = true;
  workLogs$!: Observable<WorkLog[]>;
  constructor() {

  }

  ngOnInit(): void {

  }
  toggleSidebar() {
    console.log('Toggling sidebar,', this.displaySideBar);
    this.displaySideBar = !this.displaySideBar;
    return this.displaySideBar;
  }

}
