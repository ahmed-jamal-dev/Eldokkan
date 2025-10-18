import { Router, RequestHandler } from 'express';
import {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    loginUser,
} from '../controllers/user.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const asHandler = (fn: any) => fn as unknown as RequestHandler;

const userRouter = Router();

// Public routes
userRouter.post('/register', asHandler(createUser));
userRouter.post('/login', asHandler(loginUser));

//  Protected routes
userRouter.use(authMiddleware);

userRouter.get('/getUsers', asHandler(getUsers));
userRouter.get('/getUserById', asHandler(getUserById));
userRouter.put('/update', asHandler(updateUser));
userRouter.delete('/delete', asHandler(deleteUser));

export default userRouter;
