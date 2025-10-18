export interface getProductsRequest {}
export type getProductsResponse = {
    message: string;
    data: any[];
};


export interface createProductRequest {
    title: string;
    description: string;
    price: number;
    userId: string;
}

export interface createProductResponse {
    id: string;
    title: string;
    description: string | null;
    price: number;
    userId: string;
}
export interface getProductByIdRequest {
    id: string;
}
export interface getProductByIdResponse {
    id: string;
    title: string;
    description: string | null;
    price: number;
    userId: string;
}
export interface updateProductRequest {
    id: string;
    title?: string;
    description?: string;
    price?: number;
    userId?: string;
}
export interface updateProductResponse {
    message: string;
    data: {
        id: string;
        title: string;
        description: string | null;
        price: number;
        userId: string;
    };
}
export interface deleteProductRequest {
    id: string;
}
export interface deleteProductResponse {
    message: string;
}
