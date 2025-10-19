import { PrismaClient, OrderStatus, OrderItem } from '@prisma/client';
const prisma = new PrismaClient();

export const OrderDAO = {
    create: (data: {
        userId: string;
        total: number;
        status?: OrderStatus;
        address: string;
    }): Promise<any> => {
        return prisma.order.create({ data });
    },

    getById: (id: string): Promise<any | null> => {
        return prisma.order.findUnique({ where: { id }, include: { items: true } });
    },

    update: (
        id: string,
        data: Partial<{ total: number; status: OrderStatus; address: string }>
    ): Promise<any> => {
        return prisma.order.update({ where: { id }, data });
    },

    delete: (id: string): Promise<any> => {
        return prisma.order.delete({ where: { id } });
    },

    getAll: (): Promise<any[]> => {
        return prisma.order.findMany({ include: { items: true } });
    },
};
