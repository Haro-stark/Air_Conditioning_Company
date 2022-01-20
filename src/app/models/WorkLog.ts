import { Order } from "./Order";

export interface WorkLog {
    workLogId: number;
    date: Date;
    numberOfHours: number;
    order: Order;
}