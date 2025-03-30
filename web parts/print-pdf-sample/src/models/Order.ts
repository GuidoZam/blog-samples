import { OrderDetail } from "./OrderDetail";

export class Order {
	idOrder: string;
	displayName: string;
	description?: string;
	notes?: string;
	finalPrice: number;
	orderNumber?: string;
	
	orderDetails?: OrderDetail[];
}
