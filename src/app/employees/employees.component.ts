import { Component, OnInit } from '@angular/core';
import * as Long from 'long';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [
    {
      employeeId: Long.fromNumber(1),
      type: 'emp',
      username: 'fawad',
      password: '12312',
      priceTime: 69,
      workLogList: [],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
