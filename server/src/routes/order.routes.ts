import { Router } from 'express';
import {
    getOrders,
    createOrder,
    getOrderById,
    deleteOrder,
    updateOrder,
} from '../controllers/order.controller';

const orderRouter = Router();
orderRouter.post('/createOrder', createOrder);
orderRouter.get('/getOrders', getOrders);
orderRouter.get('/getOrderById', getOrderById);
orderRouter.put('/updateOrder', updateOrder);
orderRouter.delete('/deleteOrder', deleteOrder);
export default orderRouter;
