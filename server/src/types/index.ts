import { Role as PrismaRole ,PrismaClient} from '@prisma/client';
import { RequestHandler } from 'express';
export const prisma = new PrismaClient();


export type WithMessage<T> = T & { message: string };

export type ExpressHandler<Req, Res> = RequestHandler<
    string,
    Partial<WithMessage<Res>>,
    Partial<Req>,
    any
>;

export interface JwtObject {
    userId: string;
    role?: Role;
}
export type Role = PrismaRole;

