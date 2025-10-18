import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET ?? 'your_jwt_secret';

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
export default authMiddleware;
