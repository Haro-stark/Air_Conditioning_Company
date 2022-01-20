import { Component, OnInit } from '@angular/core';
import { WorkLog } from '../models/WorkLog';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {

  workLogs!: WorkLog[];
  constructor() { }

  ngOnInit(): void {
  }

}
