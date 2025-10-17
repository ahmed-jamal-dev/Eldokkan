import { PrismaClient } from "@prisma/client";
import { ExpressHandler } from "@/types";
import {
  getOrderItemsRequest,
  getOrderItemsResponse,
  createOrderItemRequest,
  createOrderItemResponse,
  getOrderItemByIdRequest,
  getOrderItemByIdResponse,
  updateOrderItemRequest,
  updateOrderItemResponse,
  deleteOrderItemRequest,
  deleteOrderItemResponse,
} from "@/apis/orderItem.api";

const prisma = new PrismaClient();

export const getOrderItems: ExpressHandler<getOrderItemsRequest, getOrderItemsResponse> = async (_req, res) => {
  try {
    const orderItems = await prisma.orderItem.findMany();
    const data = orderItems.map(i => ({
      id: i.id,
      orderId: i.orderId,
      productId: i.productId,
      quantity: i.quantity,
      price: i.unitPrice,
    }));

    res.json({ message: "Order items fetched successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch order items" });
  }
};

export const createOrderItem: ExpressHandler<createOrderItemRequest, createOrderItemResponse> = async (req, res) => {
  const { orderId, productId, quantity, price } = req.body;

  if (!orderId || !productId || typeof quantity !== "number" || typeof price !== "number") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newOrderItem = await prisma.orderItem.create({
      data: { orderId, productId, quantity, unitPrice: price },
    });

    const data = {
      id: newOrderItem.id,
      orderId: newOrderItem.orderId,
      productId: newOrderItem.productId,
      quantity: newOrderItem.quantity,
      price: newOrderItem.unitPrice,
    };

    res.status(201).json({ message: "Order item created successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order item" });
  }
};

export const getOrderItemById: ExpressHandler<getOrderItemByIdRequest, getOrderItemByIdResponse> = async (req, res) => {
  const { id  } = req.params;

  try {
    const orderItem = await prisma.orderItem.findUnique({ where: { id } });
    if (!orderItem) return res.status(404).json({ message: "Order item not found" });

    const data = {
      id: orderItem.id,
      orderId: orderItem.orderId,
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      price: orderItem.unitPrice,
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch order item" });
  }
};

export const updateOrderItem: ExpressHandler<updateOrderItemRequest, updateOrderItemResponse> = async (req, res) => {
  const { id, orderId, productId, quantity, price } = req.body;

  try {
    const updatedOrderItem = await prisma.orderItem.update({
      where: { id },
      data: { orderId, productId, quantity, unitPrice: price },
    });

    const data = {
      id: updatedOrderItem.id,
      orderId: updatedOrderItem.orderId,
      productId: updatedOrderItem.productId,
      quantity: updatedOrderItem.quantity,
      price: updatedOrderItem.unitPrice,
    };

    res.json({ message: "Order item updated successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order item" });
  }
};

export const deleteOrderItem: ExpressHandler<deleteOrderItemRequest, deleteOrderItemResponse> = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.orderItem.delete({ where: { id } });
    res.json({ message: "Order item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete order item" });
  }
};
