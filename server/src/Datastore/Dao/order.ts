import { Order } from "@/types";

export interface OrderDao {
  createOrder(order: Omit<Order, "id" | "created_at">): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrdersByUserId(user_id: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  listOrders(): Promise<Order[]>;
  deleteOrder(id: string): Promise<void>;
}
