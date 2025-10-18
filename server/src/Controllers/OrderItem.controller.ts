import { PrismaClient } from '@prisma/client';
import { ExpressHandler } from '@/types';
import {
    GetOrderItemsRequest,
    GetOrderItemsResponse,
    CreateOrderItemRequest,
    CreateOrderItemResponse,
    GetOrderItemByIdRequest,
    GetOrderItemByIdResponse,
    UpdateOrderItemRequest,
    UpdateOrderItemResponse,
    DeleteOrderItemRequest,
    DeleteOrderItemResponse,
} from "../apis/orderItem.api"

const prisma = new PrismaClient();

export const getOrderItems: ExpressHandler<GetOrderItemsRequest, GetOrderItemsResponse> = async (
    _req,
    res
) => {
    try {
        const orderItems = await prisma.orderItem.findMany();
        res.json({
            message: 'Order items fetched successfully',
            data: orderItems,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch order items' });
    }
};

export const createOrderItem: ExpressHandler<
    CreateOrderItemRequest,
    CreateOrderItemResponse
> = async (req, res) => {
    const { orderId, productId, quantity, unitPrice } = req.body;

    if (!orderId || !productId || typeof quantity !== 'number' || typeof unitPrice !== 'number') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newOrderItem = await prisma.orderItem.create({
            data: { orderId, productId, quantity, unitPrice: unitPrice },
        });

        res.status(201).json({
            message: 'Order item created successfully',
            data: newOrderItem,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create order item' });
    }
};

export const getOrderItemById: ExpressHandler<
    GetOrderItemByIdRequest,
    GetOrderItemByIdResponse
> = async (req, res) => {
    const id = req.body.id;

    try {
        const orderItem = await prisma.orderItem.findUnique({ where: { id } });
        if (!orderItem) return res.status(404).json({ message: 'Order item not found' });

        res.json(orderItem);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch order item' });
    }
};

export const updateOrderItem: ExpressHandler<
    UpdateOrderItemRequest,
    UpdateOrderItemResponse
> = async (req, res) => {
    const { id, orderId, productId, quantity, unitPrice } = req.body;

    try {
        const updatedOrderItem = await prisma.orderItem.update({
            where: { id },
            data: { orderId, productId, quantity, unitPrice: unitPrice },
        });

        res.json({
            message: 'Order item updated successfully',
            data: updatedOrderItem,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update order item' });
    }
};

export const deleteOrderItem: ExpressHandler<
    DeleteOrderItemRequest,
    DeleteOrderItemResponse
> = async (req, res) => {
    const id = req.body.id;

    try {
        await prisma.orderItem.delete({ where: { id } });
        res.json({ message: 'Order item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete order item' });
    }
};
