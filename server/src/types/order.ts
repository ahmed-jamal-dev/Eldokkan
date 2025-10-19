import { User } from './user';
import { OrderItem } from './orderItem';
import { OrderStatus } from '@prisma/client';

export interface Order {
  id: string;
  user: User;
  userId: string;
  total: number;
  status: OrderStatus; 
  address: string;
  createdAt: Date;
  items?: OrderItem[];
}
