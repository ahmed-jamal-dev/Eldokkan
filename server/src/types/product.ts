import { Category } from './category';
import { User } from './user';
import { OrderItem } from './orderItem';

export interface Product {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category?: Category ;
  categoryId?: string ;
  user: User;
  userId: string;
  orderItems?: OrderItem[];
}
