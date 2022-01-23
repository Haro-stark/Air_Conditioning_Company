import { WorkLog } from "./WorkLog";

export interface Employee {
    employeeId: number;
    type: string;
    userName: string;
    password: string;
    priceTime: number;
    workLogList: WorkLog[];
}