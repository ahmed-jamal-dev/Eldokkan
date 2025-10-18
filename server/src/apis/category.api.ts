export interface createCategoryRequest {
    name: string | undefined;
    slug: string | undefined;
}
export interface createCategoryResponse {
    message: string;
    data: {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
    };
}
export interface getCategoriesRequest {}
export type getCategoriesResponse = {
    message: string;
    data: {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
    }[];
};
export interface getCategoryByIdRequest {
    id: string;
}
export interface getCategoryByIdResponse {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
}
export interface updateCategoryRequest {
    id: string;
    name?: string;
    slug?: string;
}
export interface updateCategoryResponse {
    message: string;
    data: {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
    };
}
export interface deleteCategoryRequest {
    id: string;
}
export interface deleteCategoryResponse {
    message: string;
}
