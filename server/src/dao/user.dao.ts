import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const UserDAO = {
  create: (data: { name: string; email: string; password: string; role?: string }) =>
    prisma.user.create({ data }),

  getById: (id: string) =>
    prisma.user.findUnique({ where: { id } }),

  getByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  update: (id: string, data: Partial<{ name: string; email: string; password: string; role: string }>) =>
    prisma.user.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.user.delete({ where: { id } }),

  getAll: () =>
    prisma.user.findMany(),
};
