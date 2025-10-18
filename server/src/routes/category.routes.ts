import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory,
} from '../controllers/category.controller';
import { Router } from 'express';

export const categoryRouter = Router();
categoryRouter.get('/getCategories', getCategories);
categoryRouter.post('/createCategory', createCategory);
categoryRouter.get('/getCategoryById', getCategoryById);
categoryRouter.put('/updateCategory', updateCategory);
categoryRouter.delete('/deleteCategory', deleteCategory);

export default categoryRouter;
