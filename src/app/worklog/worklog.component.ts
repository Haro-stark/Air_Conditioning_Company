import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { faEdit, faTrashAlt, faCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable, of } from 'rxjs';
import { Order } from '../models/Order';
import { WorkLog } from '../models/WorkLog';
import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css','../shared/icon.css'],
})
export class WorklogComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;
  workLogs$!: Observable<WorkLog[] | null | undefined>;
  dateControl = new Date();
  orders: Order[] = [
    {
      orderId: 1,
      name: 'abc',
      status: 'accepted',
      productList: [],
      customer: { customerId: 112, name: 'cus1' },
    },
  ];

  worklogs: WorkLog[] = [
    {
      workLogId: 1,
      date: new Date(),
      numberOfHours: 5,
      order: {
        orderId: 1,
        type: ['abc'],
        name: 'abc',
        status: 'accepted',
        productList: [],
        customer: { customerId: 112, name: 'cus1' },
      },
    },
    {
      workLogId: 2,
      date: new Date(),
      numberOfHours: 3,
      order: {
        orderId: 3,
        type: ['abc'],
        name: 'abc',
        status: 'accepted',
        productList: [],
        customer: { customerId: 112, name: 'cus1' },
      },
    },
    {
      workLogId: 3,
      date: new Date(),
      numberOfHours: 4,
      order: {
        orderId: 1,
        type: ['abc'],
        name: 'abc',
        status: 'accepted',
        customer: { customerId: 112, name: 'cus1' },
      },
    },
  ];
  logIdCount = 3;
  user: any;
  // postRef: any;
  // post$: any;

  public createNewWorkLogModal!: NgbModalRef;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    public auth: AuthenticationService,
    private afs: AngularFirestore,
    private httpService: HttpService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    // this.workLogs$ = this.httpService.getWorkLogs().pipe(
    //   map(data => {
    //     console.log(data)
    //     return data;
    //   }),
    //   catchError((error: string) => {
    //     alert("Error retrieving data. : " + error);
    //     return of(null);
    //   }
    //   )
    // )
    this.workLogs$ = of(this.worklogs);
  }

  saveServer(createWorkLog: NgForm): void {
    let log: WorkLog = {
      workLogId: this.logIdCount++,
      date: new Date(),
      numberOfHours: createWorkLog.value.numberOfHours,
      order: {
        orderId: 1,
        type: ['abc'],
        name: 'abc',
        status: 'accepted',
        customer: { customerId: 112, name: 'cus1' },
      },
    };
    this.worklogs.push(log);
    this.workLogs$ = of(this.worklogs);
    this.createNewWorkLogModal.close();

    //   console.log(createWorkLog.value.date);
    //   if (createWorkLog.value.date && createWorkLog.value.order && createWorkLog.value.numberOfHours)
    //     this.createNewWorkLogModal.close();
    //   else
    //     alert("Please provide all the fields")
  }

  openCreateWorkLogModal(content: any) {
    this.createNewWorkLogModal = this.modalService.open(content);
  }

  deleteLog(log: WorkLog) {
    // let data = this.worklogs.filter(
    //   (worklog) => {
    //     worklog.workLogId === log.workLogId;
    //   }
    // )
    for (var i = 0; i < this.worklogs.length; i++) {
      if (this.worklogs[i].workLogId === log.workLogId) {
        this.worklogs.splice(i, 1);
        i--;
      }
    }
    this.workLogs$ = of(this.worklogs);
  }
  editLog(log: any) {}

  // getDate(): Date {
  //   let date = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  //   return new Date(date);
  // }
}
