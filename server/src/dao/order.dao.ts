import { PrismaClient, OrderStatus } from "@prisma/client";
const prisma = new PrismaClient();

export const OrderDAO = {
  create: (data: { userId: string; total: number; status?: OrderStatus; address: string }) =>
    prisma.order.create({ data }),

  getById: (id: string) =>
    prisma.order.findUnique({ where: { id }, include: { items: true } }),

  update: (id: string, data: Partial<{ total: number; status: OrderStatus; address: string }>) =>
    prisma.order.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.order.delete({ where: { id } }),

  getAll: () =>
    prisma.order.findMany({ include: { items: true } }),
};
