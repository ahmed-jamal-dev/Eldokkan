import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const OrderItemDAO = {
    create: (data: {
        orderId: string;
        productId: string;
        quantity: number;
        unitPrice: number;
    }): Promise<any> => {
        return prisma.orderItem.create({ data });
    },

    getById: (id: string): Promise<any | null> => {
        return prisma.orderItem.findUnique({ where: { id } });
    },

    update: (id: string, data: Partial<{ quantity: number; unitPrice: number }>): Promise<any> => {
        return prisma.orderItem.update({ where: { id }, data });
    },

    delete: (id: string): Promise<any> => {
        return prisma.orderItem.delete({ where: { id } });
    },

    getAll: (): Promise<any[]> => {
        return prisma.orderItem.findMany();
    },
};
