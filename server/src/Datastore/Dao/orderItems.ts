import { OrderItem } from "@/types";

export interface OrderItemDao {
  addOrderItem(item: Omit<OrderItem, "id" | "created_at">): Promise<OrderItem>;
  getOrderItemById(id: string): Promise<OrderItem | undefined>;
  listOrderItems(order_id: string): Promise<OrderItem[]>;
  deleteOrderItem(id: string): Promise<void>;
}
