import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import categoryRoutes from './routes/category.routes';
import orderItemRoutes from './routes/orderItem.routes';
import { RequestLoggerMiddleware } from './middleware/loggerMiddleware';
import { errorHandler } from './middleware/errorMiddleware';
const app = express();

app.use(cors());
app.use(express.json());
app.use(RequestLoggerMiddleware);
// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orderItems', orderItemRoutes);
// Error Handling Middleware
app.use(errorHandler);

export default app;
