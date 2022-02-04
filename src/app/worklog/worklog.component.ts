import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Order } from '../models/Order';
import { Response } from '../models/Response';
import { WorkLog } from '../models/WorkLog';
import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css', '../shared/icon.css'],
})
export class WorklogComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  checkIcon = faCheck;
  closeIcon = faWindowClose;

  public createNewWorkLogModal!: NgbModalRef;
  workLogs$!: Observable<WorkLog[] | null | undefined>;
  orders$!: Observable<Order[] | null | undefined>;

  dateControl = new Date();
  worklogs!: WorkLog[];
  orders!: Order[];
  updatedWorklog!: WorkLog;

  showErrorAlert: boolean = false;
  showEditWorklogForm: boolean = false;
  processingNetworkRequest: boolean = false;
  loading: Boolean = false;
  user: any;

  apiRequestError = {
    error: { text: '' },
    name: '',
    message: '',
    status: 0,
    url: '',
  };
  apiSuccessResponse = '';

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    public auth: AuthenticationService,
    private httpService: HttpService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;

      this.workLogs$ = this.httpService.getWorkLog(this.user.email).pipe(
        map((response: any) => {
          if (response.data && response.status === 200) {
            this.worklogs = response.data;
            this.loading = false;
          } else {
            this.showApiErrorResponse(response.message);
            this.loading = false;
          }
          return this.worklogs;
        }),

        catchError((error: any) => {
          this.showApiErrorResponse('Network Request Error');
          this.loading = false;

          return of(null);
        })
      );

      this.orders$ = this.httpService.getOrder().pipe(
        map((response: any) => {
          if (response.data && response.status === 200) {
            this.orders = response.data;
          } else {
            this.showApiErrorResponse(response.message);
          }
          return this.orders;
        }),
        catchError((error: any) => {
          this.showApiErrorResponse('Network Request Error');
          return of(null);
        })
      );
    });

    console.log(this.workLogs$);
  }

  saveServer(createWorkLog: NgForm): void {
    if (createWorkLog.value.order && createWorkLog.value.numberOfHours) {
      this.createNewWorkLogModal.close();
      this.workLogs$ = this.httpService
        .addWorkLog(createWorkLog.value, this.user.email)
        .pipe(
          map((response: any) => {
            if (response.data && response.status === 200) {
              this.worklogs = response.data;
            } else {
              this.showApiErrorResponse(response.message);
            }
            return this.worklogs;
          }),
          startWith(this.worklogs),
          catchError((error: any) => {
            this.showApiErrorResponse('Network Request Failed');
            return of(null);
          })
        );
    } else alert('Please provide all the fields');
  }

  openCreateWorkLogModal(content: any) {
    this.createNewWorkLogModal = this.modalService.open(content);
  }

  deleteLog(log: WorkLog) {
    console.log(log.workLogId);
    this.processingNetworkRequest = true;

    this.workLogs$ = this.httpService.deleteWorkLog(log.workLogId).pipe(
      map((response: any) => {
        if (response.status == 200) {
          this.worklogs = this.worklogs.filter(
            (data) => data.workLogId != log.workLogId
          );
          this.processingNetworkRequest = false;
        } else {
          this.showApiErrorResponse(response.message);
        }
        return this.worklogs;
      }),
      startWith(this.worklogs),
      catchError((error: any) => {
        this.showApiErrorResponse(error);
        return of(this.worklogs);
      })
    );
  }

  editLog(log: WorkLog) {
    this.updatedWorklog = log;
    this.showEditWorklogForm = !this.showEditWorklogForm;
  }

  onUpdateLog(editFormWorklog: NgForm) {
    this.processingNetworkRequest = !this.processingNetworkRequest;
    if (editFormWorklog.value.order && editFormWorklog.value.numberOfHours) {
      this.updatedWorklog.numberOfHours = editFormWorklog.value.numberOfHours;
      this.updatedWorklog.order = editFormWorklog.value.order;
      this.processingNetworkRequest = true;

      this.workLogs$ = this.httpService.updateWorkLog(this.updatedWorklog).pipe(
        map((response: any) => {
          if (response.data && response.status === 200) {
            var i = this.worklogs.findIndex(
              (log) => log.workLogId === response.data.workLogId
            );
            this.worklogs[i] = response.data;
            this.processingNetworkRequest = false;

            this.showEditWorklogForm = !this.showEditWorklogForm;
          } else {
            this.showApiErrorResponse(response.message);
          }

          return this.worklogs;
        }),
        catchError((error: any) => {
          this.showApiErrorResponse('Network Request Failed');
          return of(null);
        })
      );
    } else alert('Please provide all the fields');
  }

  onClickToggleEditEmployeeForm() {
    this.showEditWorklogForm = !this.showEditWorklogForm;
  }

  showApiErrorResponse(message?: any) {
    if (message) {
      this.apiRequestError.message = message;
    } else {
      this.apiRequestError.message =
        'Error! please check your internet connection and try again';
    }
    this.showErrorAlert = true;
    this.processingNetworkRequest = false;

    setTimeout(() => {
      this.showErrorAlert = false;
    }, 3500);
  }
}
