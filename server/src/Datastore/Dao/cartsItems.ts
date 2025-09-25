import { CartItem } from "@/types";

export interface CartItemDao {
  addCartItem(item: Omit<CartItem, "id" | "created_at">): Promise<CartItem>;
  getCartItemById(id: string): Promise<CartItem | undefined>;
  listCartItems(cart_id: string): Promise<CartItem[]>;
  removeCartItem(id: string): Promise<void>;
}

