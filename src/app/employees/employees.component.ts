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
      employeeId: 1,
      type: 'emp',
      username: 'fawad',
      password: '12312',
      priceTime: 69,
      workLogList: [],
    },
    {
      employeeId: 1,
      type: 'asd',
      username: 'zxc',
      password: '2q',
      priceTime: 69,
      workLogList: [],
    },
    {
      employeeId: 1,
      type: 'asd',
      username: '2wre',
      password: 'gbf',
      priceTime: 69,
      workLogList: [],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
