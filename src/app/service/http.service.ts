import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkLog } from '../models/WorkLog';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private hostUrl: string = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  getWorkLogs(): Observable<WorkLog[]> {
    return this.http.get<WorkLog[]>(`${this.hostUrl}/WorkLog/list`)
  }
  addWorkLogs(worklog: WorkLog): Observable<WorkLog> {
    return this.http.post<WorkLog>(`${this.hostUrl}/add`, worklog);
  }
  deleteWorkLogs(worklog: WorkLog): Observable<WorkLog> {
    return this.http.delete<WorkLog>(`${this.hostUrl}/delete/${worklog.workLogId}`);
  }
  updateWorkLogs(worklog: WorkLog): Observable<WorkLog> {
    return this.http.put<WorkLog>(`${this.hostUrl}/update`, worklog);
  }
}
