import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const ProductDAO = {
  create: (data: { title: string; description?: string; price: number; userId: string; categoryId?: string }) =>
    prisma.product.create({ data }),

  getById: (id: string) =>
    prisma.product.findUnique({ where: { id } }),

  update: (id: string, data: Partial<{ title: string; description?: string; price: number; categoryId?: string }>) =>
    prisma.product.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.product.delete({ where: { id } }),

  getAll: () =>
    prisma.product.findMany(),
};
