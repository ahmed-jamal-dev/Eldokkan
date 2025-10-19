import { Role } from '@prisma/client';
import { User } from '../types/user';

// Get All Users
export interface getUsersRequest {}

export interface getUsersResponse {
  message: string;
  data: Omit<User, 'password'>[];
}

//  Create User
export interface createUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface createUserResponse {
  message: string;
  data: Omit<User, 'password'>;
}

//  Get User by ID
export interface getUserByIdRequest {
  id: string;
}

export interface getUserByIdResponse extends Omit<User, 'password'> {}

//  Update User
export interface updateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export interface updateUserResponse {
  message: string;
  data: Omit<User, 'password'>;
}

//  Delete User
export interface deleteUserRequest {
  id: string;
}

export interface deleteUserResponse {
  message: string;
}

//  Login
export interface loginUserRequest {
  email: string;
  password: string;
}

export interface loginUserResponse {
  message: string;
  token?: string;
  user?: Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'products' | 'orders'>;
}
