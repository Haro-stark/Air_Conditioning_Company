import { WorkLog } from './WorkLog';

export interface Employee {
  employeeId?: number;
  type: string;
  username: string;
  email: string;
  password: string;
  priceTime: number;
  workLogList: WorkLog[];
}
