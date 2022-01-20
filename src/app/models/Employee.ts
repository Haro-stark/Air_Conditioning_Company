import { WorkLog } from "./WorkLog";

export interface Employee {
    employeeId: Long;
    type: String;
    username: String;
    password: String;
    priceTime: number;
    workLogList: WorkLog[];
}