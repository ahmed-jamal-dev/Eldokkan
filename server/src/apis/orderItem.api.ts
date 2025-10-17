export interface getOrderItemsRequest {}
export type getOrderItemsResponse = {
  message: string;
  data: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
export interface createOrderItemRequest {
  orderId: string | undefined;
  productId: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
}
export interface createOrderItemResponse {
  message: string;
  data: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface getOrderItemByIdRequest {
  id: string;
}
export interface getOrderItemByIdResponse {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface updateOrderItemRequest {
  id: string;
  orderId?: string;
  productId?: string;
  quantity?: number;
  price?: number;
}
export interface updateOrderItemResponse {
  message: string;
  data: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface deleteOrderItemRequest {
  id: string;
}
export interface deleteOrderItemResponse {
  message: string;
}