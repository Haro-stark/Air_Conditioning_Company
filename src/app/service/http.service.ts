import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkLog } from '../models/WorkLog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private hostUrl: string = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  getWorkLogs(): Observable<WorkLog[]> {
    return this.http.get<WorkLog[]>(`${this.hostUrl}/WorkLog/list`)
  }
}
