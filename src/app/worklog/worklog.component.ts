import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable, of } from 'rxjs';
import { Order } from '../models/Order';
import { WorkLog } from '../models/WorkLog';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css']
})
export class WorklogComponent implements OnInit {
  workLogs$!: Observable<WorkLog[]>;
  dateControl = new Date();
  orders!: Order[]
  logs!: WorkLog[]
  public createNewWorkLogModal!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private httpService: HttpService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    // this.workLogs$ = this.httpService.getWorkLogs().pipe(
    //   map(
    //     response => {
    //       // this.logs.push(response);
    //       return { ...response }
    //     }
    //   ),
    //   catchError((error: string) => {
    //     alert("Error retrieving data. : " + error);
    //     return of(this.logs);
    //   }
    //   )
    // )
    // this.workLogs$ = this.httpService.getWorkLogs().subscribe();
  }

  saveWorklog(createWorkLog: NgForm): void {

    console.log(createWorkLog.value.date);
    if (!createWorkLog.value.date || !createWorkLog.value.order || !createWorkLog.value.numberOfHours)
      alert("Please provide all the fields")
    else {
      this.createNewWorkLogModal.close();
      // this.httpService.addWorkLogs(createWorkLog.value as WorkLog).subscribe(
      //   response => this.logs.push(response)
      // );

      this.workLogs$ = this.httpService.addWorkLogs(createWorkLog.value as WorkLog).pipe(
        map(response => {
          this.logs.push(response)
          this.orders.push(response.order)
          // this.logs.forEach(val => this.orders.push(val.order))
          return { ...this.logs }
        })
      )
    }

  }

  openCreateWorkLogModal(content: any) {
    this.createNewWorkLogModal = this.modalService.open(content);
  }

  deleteWorklog(workLog: WorkLog) {
    this.httpService.deleteWorkLogs(workLog);
    this.workLogs$ = this.httpService.deleteWorkLogs(workLog).pipe(
      map(response => {
        this.logs.push(response)
        this.orders.push(response.order)
        // this.logs.forEach(val => this.orders.push(val.order))
        return { ...this.logs }
      })
    )
  }


}
