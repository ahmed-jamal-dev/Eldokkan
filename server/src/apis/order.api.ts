export interface GetOrdersRequest {}

export interface GetOrdersResponse {
  orders: {
    id: string;
    userId: string;
    total: number;
    status: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    items: {
      productId: string;
      quantity: number;
      unitPrice: number;
    }[];
  }[];
}

export interface CreateOrderRequest {
  userId: string;
  address: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface CreateOrderResponse {
  id: string;
  userId: string;
  total: number;
  status: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface GetOrderByIdRequest {
  id: string;
}

export interface GetOrderByIdResponse {
  id: string;
  userId: string;
  total: number;
  status: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface UpdateOrderRequest {
  id: string;
  status: string;
}

export interface UpdateOrderResponse {
  id: string;
  userId: string;
  total: number;
  status: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface DeleteOrderRequest {
  id: string;
}

export interface DeleteOrderResponse {
  message: string;
}
