
export interface User {
  id: string;
  name: string;
  email: string; // must be unique value
  password: string;
  role: string;
  created_at: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string; 
  created_at: Date;
}

export interface Cart {
  id: string;
  user_id: string; 
  created_at: Date;
}

export interface CartItem {
  id: string;
  cart_id: string;   
  product_id: string; 
  quantity: number;
  created_at: Date;
}

export interface Order {
  id: string;
  user_id: string; 
  status: string;
  total_price: number;
  created_at: Date;
}

export interface OrderItem {
  id: string;
  order_id: string;   
  product_id: string; 
  quantity: number;
  price: number;
  created_at: Date;
}