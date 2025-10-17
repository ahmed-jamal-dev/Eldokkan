import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const OrderItemDAO = {
  create: (data: { orderId: string; productId: string; quantity: number; unitPrice: number }) =>
    prisma.orderItem.create({ data }),

  getById: (id: string) =>
    prisma.orderItem.findUnique({ where: { id } }),

  update: (id: string, data: Partial<{ quantity: number; unitPrice: number }>) =>
    prisma.orderItem.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.orderItem.delete({ where: { id } }),

  getAll: () =>
    prisma.orderItem.findMany(),
};
