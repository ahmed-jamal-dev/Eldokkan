import {
    CreateOrderRequest,
    CreateOrderResponse,
    DeleteOrderRequest,
    DeleteOrderResponse,
    GetOrderByIdRequest,
    GetOrderByIdResponse,
    GetOrdersRequest,
    GetOrdersResponse,
    UpdateOrderRequest,
    UpdateOrderResponse,
} from '../apis/order.api';
import { ExpressHandler } from '@/types';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all orders
export const getOrders: ExpressHandler<GetOrdersRequest, GetOrdersResponse> = async (_req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(orders as unknown as GetOrdersResponse);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Create a new order
export const createOrder: ExpressHandler<CreateOrderRequest, CreateOrderResponse> = async (
    req,
    res
) => {
    try {
        const { userId, items, total, address } = req.body;
        if (!userId || !items || !total || !address) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newOrder = await prisma.order.create({
            data: {
                userId,
                total,
                address,
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                    })),
                },
            },
            include: { items: true }, 
        });

        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

// Get order by ID
export const getOrderById: ExpressHandler<GetOrderByIdRequest, GetOrderByIdResponse> = async (
    req,
    res
) => {
        const id = req.body.id;
    if (!id) return res.status(400).json({ message: 'Missing order id' });

    try {
        const order = await prisma.order.findUnique({ where: { id } });
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json(order as unknown as GetOrderByIdResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};

// Update order
export const updateOrder: ExpressHandler<UpdateOrderRequest, UpdateOrderResponse> = async (
    req,
    res
) => {
    const { status , id } = req.body;
    if (!id) return res.status(400).json({ message: 'Missing order id' });

    try {
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status } as any,
        });

        res.json(updatedOrder as unknown as UpdateOrderResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update order' });
    }
};

// Delete order
export const deleteOrder: ExpressHandler<DeleteOrderRequest, DeleteOrderResponse> = async (
    req,
    res
) => {
    const id = req.body.id;
    if (!id) return res.status(400).json({ message: 'Missing order id' });

    try {
        await prisma.order.delete({ where: { id } });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete order' });
    }
};
