import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkLog } from '../models/WorkLog';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css']
})
export class WorklogComponent implements OnInit {
  workLogs$!: Observable<WorkLog[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
