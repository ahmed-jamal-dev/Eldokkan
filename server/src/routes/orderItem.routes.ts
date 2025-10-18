import {
    getOrderItems,
    createOrderItem,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem,
} from '../controllers/OrderItem.controller';
import { Router } from 'express';

export const orderItemRoutes = Router();

orderItemRoutes.post('/createOrderItem', createOrderItem);
orderItemRoutes.get('/getOrderItems', getOrderItems);
orderItemRoutes.get('/getOrderItemById', getOrderItemById);
orderItemRoutes.put('/updateOrderItem', updateOrderItem);
orderItemRoutes.delete('/deleteOrderItem', deleteOrderItem);

export default orderItemRoutes;
