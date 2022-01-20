import { WorkLog } from "./WorkLog";

export interface Employee {
    employeeId: number;
    type: String;
    username: String;
    password: String;
    priceTime: number;
    workLogList: WorkLog[];
}