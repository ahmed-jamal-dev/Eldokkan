export interface GetOrderItemsRequest {}

export type GetOrderItemsResponse = {
    message: string;
    data: {
        id: string;
        orderId: string;
        productId: string;
        quantity: number;
        unitPrice:  number;
    }[];
};

export interface CreateOrderItemRequest {
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
}

export interface CreateOrderItemResponse {
    message: string;
    data: {
        id: string;
        orderId: string;
        productId: string;
        quantity: number;
        unitPrice: number;
    };
}

export interface GetOrderItemByIdRequest {
    id: string;
}

export interface GetOrderItemByIdResponse {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdateOrderItemRequest {
    id: string;
    orderId?: string;
    productId?: string;
    quantity?: number;
    unitPrice?: number;
}

export interface UpdateOrderItemResponse {
    message: string;
    data: {
        id: string;
        orderId: string;
        productId: string;
        quantity: number;
        unitPrice: number;
    };
}

export interface DeleteOrderItemRequest {
    id: string;
}

export interface DeleteOrderItemResponse {
    message: string;
}
