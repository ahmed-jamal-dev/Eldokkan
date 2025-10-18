

export interface CreateOrderRequest {
    userId: string;
    address: string;
    total: number;
    items: CreateOrderItemInput[]; 
}

export interface CreateOrderResponse {
    id: string;
    userId: string;
    total: number;
    status: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    items: {
        productId: string;
        quantity: number;
        unitPrice: number;
    }[];
}

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
    id: string | undefined;
}

export interface DeleteOrderResponse {
    message: string;
}

export interface CreateOrderItemInput {
    productId: string;
    quantity: number;
    unitPrice: number;
}
