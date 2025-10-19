import { Category } from './category';
import { User } from './user';
import { OrderItem } from './orderItem';

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category?: Category | null;
  categoryId?: string | null;
  user: User;
  userId: string;
  orderItems?: OrderItem[];
}
