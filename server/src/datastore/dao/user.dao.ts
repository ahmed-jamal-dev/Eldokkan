import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const UserDAO = {
    create: (data: {
        name: string;
        email: string;
        password: string;
        role?: Role;
    }): Promise<any> => {
        return prisma.user.create({ data });
    },

    getById: (id: string): Promise<any | null> => {
        return prisma.user.findUnique({ where: { id } });
    },

    getByEmail: (email: string): Promise<any | null> => {
        return prisma.user.findUnique({ where: { email } });
    },

    update: (
        id: string,
        data: Partial<{ name: string; email: string; password: string; role: Role }>
    ): Promise<any> => {
        return prisma.user.update({ where: { id }, data });
    },

    delete: (id: string): Promise<any> => {
        return prisma.user.delete({ where: { id } });
    },

    getAll: (): Promise<any[]> => {
        return prisma.user.findMany();
    },
};
