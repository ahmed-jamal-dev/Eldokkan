import { Role } from '@prisma/client';
import { Product } from './product';
import { Order } from './order';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    products?: Product[];
    orders?: Order[];
}
