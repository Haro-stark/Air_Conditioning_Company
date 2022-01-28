import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class ShareDatabetweenComponentsService {

  generatedOrder!: Order;

  private subject = new Subject<any>();
  constructor() { }

  generateNewOrder(order: Order) {
    this.generatedOrder = order;
     this.subject.next(this.generatedOrder);
  }

  onGenerateOrder(): Observable<any>{
    return this.subject.asObservable();
  }

}
