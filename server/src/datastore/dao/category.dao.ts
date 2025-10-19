import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const CategoryDAO = {
    create: (data: { name: string; slug: string }): Promise<any> => {
        return prisma.category.create({ data });
    },

    getById: (id: string): Promise<any | null> => {
        return prisma.category.findUnique({ where: { id } });
    },

    getBySlug: (slug: string): Promise<any | null> => {
        return prisma.category.findUnique({ where: { slug } });
    },

    update: (id: string, data: Partial<{ name: string; slug: string }>): Promise<any> => {
        return prisma.category.update({ where: { id }, data });
    },

    delete: (id: string): Promise<any> => {
        return prisma.category.delete({ where: { id } });
    },

    getAll: (): Promise<any[]> => {
        return prisma.category.findMany();
    },
};
