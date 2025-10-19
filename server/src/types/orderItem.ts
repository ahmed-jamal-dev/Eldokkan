import { Order } from './order';
import { Product } from './product';

export interface OrderItem {
  id: string;
  order: Order;
  orderId: string;
  product: Product;
  productId: string;
  quantity: number;
  unitPrice: number;
}
