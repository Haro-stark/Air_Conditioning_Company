import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkLog } from '../models/WorkLog';
import { faBars, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css'],
})
export class AssistantComponent implements OnInit {
  faBarsIcon = faBars;
  faMinusIcon = faMinus;
  displaySideBar: boolean = true;
  workLogs$!: Observable<WorkLog[]>;
  workLogs: WorkLog[] = [];
  constructor() { }

  ngOnInit(): void { }
  toggleSidebar() {
    console.log('Toggling sidebar,', this.displaySideBar);
    this.displaySideBar = !this.displaySideBar;
    return this.displaySideBar;
  }
}
