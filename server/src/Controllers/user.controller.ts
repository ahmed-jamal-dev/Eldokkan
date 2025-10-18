import {
    createUserRequest,
    createUserResponse,
    deleteUserRequest,
    deleteUserResponse,
    getUserByIdRequest,
    getUserByIdResponse,
    getUsersRequest,
    getUsersResponse,
    loginUserRequest,
    loginUserResponse,
    updateUserRequest,
    updateUserResponse,
} from '../apis/user.api';
import { ExpressHandler } from '@/types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('❌ Missing JWT_SECRET in environment variables');
    throw new Error('JWT_SECRET not configured');
}

//  Get All Users
export const getUsers: ExpressHandler<getUsersRequest, getUsersResponse> = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({
            message: 'Users fetched successfully',
            data: users as unknown as getUsersResponse['data'],
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

//  Register User
export const createUser: ExpressHandler<createUserRequest, createUserResponse> = async (
    req,
    res
) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: 'Missing required fields: name, email, password' });

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: passwordHash },
        });

        res.status(201).json({
            message: 'User created successfully',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user' });
    }
};

//  Login User
export const loginUser: ExpressHandler<loginUserRequest, loginUserResponse> = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'Email and password are required' });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//  Get User by ID
export const getUserById: ExpressHandler<getUserByIdRequest, getUserByIdResponse> = async (
    req,
    res
) => {
    const id = typeof req.params === 'string' ? req.params : (req.params as any).id;
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (user) res.json(user);
        else res.status(404).json({ message: 'User not found' });
    } catch {
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};

//  Update User
export const updateUser: ExpressHandler<updateUserRequest, updateUserResponse> = async (
    req,
    res
) => {
    const { id, name, email, password } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email, password: password },
        });
        res.json({
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch {
        res.status(500).json({ message: 'Failed to update user' });
    }
};

//  Delete User
export const deleteUser: ExpressHandler<deleteUserRequest, deleteUserResponse> = async (
    req,
    res
) => {
    const { id } = req.body;
    try {
        await prisma.user.delete({ where: { id } });
        res.json({ message: 'User deleted successfully' });
    } catch {
        res.status(500).json({ message: 'Failed to delete user' });
    }
};
