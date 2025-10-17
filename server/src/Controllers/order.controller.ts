import { RequestHandler } from "express";
import { OrderDAO } from "../dao/order.dao";
import { ExpressHandler, WithMessage } from "@/types";
import { CreateOrderResponse,CreateOrderRequest, GetOrdersRequest, GetOrdersResponse, GetOrderByIdRequest, GetOrderByIdResponse, DeleteOrderResponse, UpdateOrderRequest, UpdateOrderResponse, DeleteOrderRequest } from "@/apis/order.api";

// Create Order
export const createOrder: ExpressHandler<CreateOrderRequest, WithMessage<CreateOrderResponse>> = async (req, res) => {
  try {
    const { userId, address, items } = req.body;

    const total = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

    const order = await OrderDAO.create({ userId, address, total });

    const createdItems = [];
    for (const item of items) {
      const orderItem = await OrderDAO.create({ userId, address, total }).then(() => {
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        };
      });
      createdItems.push(orderItem);
    }

    const response: WithMessage<CreateOrderResponse> = {
      id: order.id,
      userId: order.userId,
      total: order.total,
      status: order.status,
      address: order.address,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      items: createdItems,
      message: "Order created successfully",
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get All Orders
export const getOrders: ExpressHandler<GetOrdersRequest, GetOrdersResponse> = async (_req, res) => {
  try {
    const orders = await OrderDAO.getAll();

    const response: GetOrdersResponse = {
      orders: orders.map(order => ({
        id: order.id,
        userId: order.userId,
        total: order.total,
        status: order.status,
        address: order.address,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        items: order.items.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
      })),
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ orders: [] });
  }
};

// Get Order by ID
export const getOrderById: ExpressHandler<GetOrderByIdRequest, GetOrderByIdResponse> = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderDAO.getById(id);
    if (!order) return res.status(404).json({ message: "Order not found" } as DeleteOrderResponse);

    const response: GetOrderByIdResponse = {
      id: order.id,
      userId: order.userId,
      total: order.total,
      status: order.status,
      address: order.address,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      items: order.items.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" } as DeleteOrderResponse);
  }
};

// Update Order
export const updateOrder: ExpressHandler<UpdateOrderRequest, WithMessage<UpdateOrderResponse>> = async (req, res) => {
  try {
    const { id, status } = req.body;

    const order = await OrderDAO.update(id, { status });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const response: WithMessage<UpdateOrderResponse> = {
      id: order.id,
      userId: order.userId,
      total: order.total,
      status: order.status,
      address: order.address,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      items: order.items.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
      message: "Order updated successfully",
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete Order
export const deleteOrder: ExpressHandler<DeleteOrderRequest, DeleteOrderResponse> = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderDAO.delete(id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
