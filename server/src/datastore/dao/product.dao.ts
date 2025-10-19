import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const ProductDAO = {
    create: (data: {
        title: string;
        description?: string;
        price: number;
        userId: string;
        categoryId?: string;
    }): Promise<any> => {
        return prisma.product.create({ data });
    },

    getById: (id: string): Promise<any | null> => {
        return prisma.product.findUnique({ where: { id } });
    },

    update: (
        id: string,
        data: Partial<{ title: string; description?: string; price: number; categoryId?: string }>
    ): Promise<any> => {
        return prisma.product.update({ where: { id }, data });
    },

    delete: (id: string): Promise<any> => {
        return prisma.product.delete({ where: { id } });
    },

    getAll: (): Promise<any[]> => {
        return prisma.product.findMany();
    },
};
