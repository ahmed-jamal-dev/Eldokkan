import { Cart } from "@/types";

export interface CartDao {
  createCart(user_id: string): Promise<Cart>;
  getCartById(id: string): Promise<Cart | undefined>;
  getCartByUserId(user_id: string): Promise<Cart | undefined>;
  listCarts(): Promise<Cart[]>;
  deleteCart(id: string): Promise<void>;
}

