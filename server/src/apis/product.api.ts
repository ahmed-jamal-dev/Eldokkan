import { Product } from '../types/product';

export interface getProductsRequest {}

export type getProductsResponse = {
  message: string;
  data: Product[]; 
};

export interface createProductRequest {
  title: string;
  description?: string | null;
  price: number;
  userId: string;
  category:string;
  categoryId:string;
}

export interface createProductResponse {
  message: string;
  data: Product; 
}

export interface getProductByIdRequest {
  id: string;
}

export interface getProductByIdResponse {
  message: string;
  data: Product | null;
}

export interface updateProductRequest {
    id: string;
    title?: string;
    description?: string;
    price?: number;
    userId?: string;
    categoryId :string;
}

export interface updateProductResponse {
  message: string;
  data: Product;
}

export interface deleteProductRequest {
  id: string;
}

export interface deleteProductResponse {
  message: string;
}
