import { Role } from '../types';
export interface getUsersRequest {}

export type getUsersResponse = {
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    }[];
};

export interface createUserRequest {
    name: string | undefined;
    email: string | undefined;
    password: string;
}

export interface createUserResponse {
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    };
}

export interface getUserByIdRequest {
    id: string;
}

export interface getUserByIdResponse {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface updateUserRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
}

export interface updateUserResponse {
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    };
}

export interface deleteUserRequest {
    id: string;
}

export interface deleteUserResponse {
    message: string;
}

export interface loginUserRequest {
    email: string;
    password: string;
}

export interface loginUserResponse {
    message: string;
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        role: Role;
    };
}
