import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const CategoryDAO = {
  create: (data: { name: string; slug: string }) =>
    prisma.category.create({ data }),

  getById: (id: string) =>
    prisma.category.findUnique({ where: { id } }),

  getBySlug: (slug: string) =>
    prisma.category.findUnique({ where: { slug } }),

  update: (id: string, data: Partial<{ name: string; slug: string }>) =>
    prisma.category.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.category.delete({ where: { id } }),

  getAll: () =>
    prisma.category.findMany(),
};
