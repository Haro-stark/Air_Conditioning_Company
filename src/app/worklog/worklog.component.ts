import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { WorkLog } from '../models/WorkLog';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css']
})
export class WorklogComponent implements OnInit {
  workLogs$!: Observable<WorkLog[]>;
  dateControl = new Date();
  orders!: Order[]
  public createNewWorkLogModal!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  saveServer(createWorkLog: NgForm): void {

    console.log(createWorkLog.value.date);
    if (createWorkLog.value.date && createWorkLog.value.order && createWorkLog.value.numberOfHours)
      this.createNewWorkLogModal.close();
    else
      alert("Please provide all the fields")
  }

  openCreateWorkLogModal(content: any) {
    this.createNewWorkLogModal = this.modalService.open(content);
  }

}
