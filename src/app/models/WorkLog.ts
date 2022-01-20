import { Order } from "./Order";

export interface WorkLog {
    workLogId: Long;
    date: Date;
    numberOfHours: number;
    order: Order;
}