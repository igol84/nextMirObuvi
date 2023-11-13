import {OrderStatusType as StatusType} from "@/lib/db/order";

export type OrderStatusType = StatusType
export const allStatus: OrderStatusType[] = ['New', 'InProgress', 'Done', 'NotDone']