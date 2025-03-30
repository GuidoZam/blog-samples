import { Order } from "./Order";

export class OrderDetail {
	idOrderDetail: string;
	idOrder: string;
	itemCode?: string;
	itemDescription: string;
	quantity: number;
	unitPrice: number;

	order: Order;
}
