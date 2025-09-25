import {
  Cart,
  CartItem,
  User,
  Product,
  Order,
  OrderItem,
  Category,
} from "@/types";
import { DataStore } from "..";
import { randomUUID } from "crypto";

export class InMemoryDataStore implements DataStore {
  private users: User[] = [];
  private products: Product[] = [];
  private categories: Category[] = [];
  private carts: Cart[] = [];
  private cartItems: CartItem[] = [];
  private orders: Order[] = [];
  private orderItems: OrderItem[] = [];

  /* ===================== USERS ===================== */
  async createUser(user: Omit<User, "id" | "created_at">): Promise<User> {
    const newUser: User = {
      ...user,
      id: randomUUID(),
      created_at: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async getUserByuserName(userName: string): Promise<User | undefined> {
    return this.users.find((u) => u.name === userName);
  }

  async listUsers(): Promise<User[]> {
    return this.users;
  }

  async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }

  /* ===================== CATEGORIES ===================== */
  async createCategory(category: Omit<Category, "id" | "created_at">): Promise<Category> {
    const newCategory: Category = {
      ...category,
      id: randomUUID(),
      created_at: new Date(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.find((c) => c.id === id);
  }

  async listCategories(): Promise<Category[]> {
    return this.categories;
  }

  async deleteCategory(id: string): Promise<void> {
    this.categories = this.categories.filter((c) => c.id !== id);
  }

  /* ===================== PRODUCTS ===================== */
  async createProduct(product: Omit<Product, "id" | "created_at">): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: randomUUID(),
      created_at: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async findProductById(id: string): Promise<Product | undefined> {
    return this.products.find((p) => p.id === id);
  }

  async listProducts(): Promise<Product[]> {
    return this.products;
  }

  async deleteProducts(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
  }

  /* ===================== CARTS ===================== */
  async createCart(user_id: string): Promise<Cart> {
    const newCart: Cart = {
      id: randomUUID(),
      user_id,
      created_at: new Date(),
    };
    this.carts.push(newCart);
    return newCart;
  }

  async getCartById(id: string): Promise<Cart | undefined> {
    return this.carts.find((c) => c.id === id);
  }

  async getCartByUserId(user_id: string): Promise<Cart | undefined> {
    return this.carts.find((c) => c.user_id === user_id);
  }

  async listCarts(): Promise<Cart[]> {
    return this.carts;
  }

  async deleteCart(id: string): Promise<void> {
    this.carts = this.carts.filter((c) => c.id !== id);
  }

  /* ===================== CART ITEMS ===================== */
  async addCartItem(item: Omit<CartItem, "id" | "created_at">): Promise<CartItem> {
    const newItem: CartItem = {
      ...item,
      id: randomUUID(),
      created_at: new Date(),
    };
    this.cartItems.push(newItem);
    return newItem;
  }

  async getCartItemById(id: string): Promise<CartItem | undefined> {
    return this.cartItems.find((ci) => ci.id === id);
  }

  async listCartItems(cart_id: string): Promise<CartItem[]> {
    return this.cartItems.filter((ci) => ci.cart_id === cart_id);
  }

  async removeCartItem(id: string): Promise<void> {
    this.cartItems = this.cartItems.filter((ci) => ci.id !== id);
  }

  /* ===================== ORDERS ===================== */
  async createOrder(order: Omit<Order, "id" | "created_at">): Promise<Order> {
    const newOrder: Order = {
      ...order,
      id: randomUUID(),
      created_at: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.find((o) => o.id === id);
  }

  async getOrdersByUserId(user_id: string): Promise<Order[]> {
    return this.orders.filter((o) => o.user_id === user_id);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.find((o) => o.id === id);
    if (order) order.status = status;
    return order;
  }

  async listOrders(): Promise<Order[]> {
    return this.orders;
  }

  async deleteOrder(id: string): Promise<void> {
    this.orders = this.orders.filter((o) => o.id !== id);
  }

  /* ===================== ORDER ITEMS ===================== */
  async addOrderItem(item: Omit<OrderItem, "id" | "created_at">): Promise<OrderItem> {
    const newItem: OrderItem = {
      ...item,
      id: randomUUID(),
      created_at: new Date(),
    };
    this.orderItems.push(newItem);
    return newItem;
  }

  async getOrderItemById(id: string): Promise<OrderItem | undefined> {
    return this.orderItems.find((oi) => oi.id === id);
  }

  async listOrderItems(order_id: string): Promise<OrderItem[]> {
    return this.orderItems.filter((oi) => oi.order_id === order_id);
  }

  async deleteOrderItem(id: string): Promise<void> {
    this.orderItems = this.orderItems.filter((oi) => oi.id !== id);
  }
}
