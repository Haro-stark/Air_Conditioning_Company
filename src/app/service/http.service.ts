import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private hostUrl: string = "http://localhost:8080"
  constructor() { }
}
