import { Product } from './product';

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  products?: Product[];
}
