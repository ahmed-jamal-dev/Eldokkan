import { Router } from 'express';
import {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById,
} from '../controllers/product.controller';

export const productRouter: Router = Router();

productRouter.post('/createProduct', createProduct);
productRouter.get('/getProducts', getProducts);
productRouter.get('/getProductById', getProductById);
productRouter.put('/updateProduct', updateProduct);
productRouter.delete('/deleteProduct', deleteProduct);

export default productRouter;
