import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { WorkLog } from '../models/WorkLog';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-worklog',
  templateUrl: './worklog.component.html',
  styleUrls: ['./worklog.component.css']
})
export class WorklogComponent implements OnInit {
  workLogs$!: Observable<WorkLog[]>;
  dateControl = new Date();
  orders!: Order[]
  user: any;
  postRef: any;
  post$: any;

  public createNewWorkLogModal!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal, public auth: AuthenticationService, private afs: AngularFirestore) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.auth.user$.subscribe(user => this.user = user)
  }

  ngOnInit(): void {
    this.postRef = this.afs.doc('posts/myTestPost')
    this.post$ = this.postRef.valueChanges()
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

  deleteLog(log: any) {

  }
  editLog(log: any) {

  }


}
