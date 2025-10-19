import { PrismaClient, Role } from '@prisma/client';
import {User} from '../../types/user'
import { prisma } from '../index';

export interface IUserDAO {
  create(data: {
    name: string;
    email: string;
    password: string;
    role?: Role;
  }): Promise<any>;

  getById(id: string): Promise<any | null>;

  getByEmail(email: string): Promise<any | null>;

  update(
    id: string,
    data: Partial<{ name: string; email: string; password: string; role: Role }>
  ): Promise<any>;

  delete(id: string): Promise<any>;

  getAll(): Promise<any[]>;
}

export const UserDAO: IUserDAO = {
  async create(data) {
    return prisma.user.create({ data });
  },

  async getById(id) {
    return prisma.user.findUnique({ where: { id } });
  },

  async getByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },

  async update(id, data) {
    return prisma.user.update({ where: { id }, data });
  },

  async delete(id) {
    return prisma.user.delete({ where: { id } });
  },

  async getAll() {
    return prisma.user.findMany();
  },
};
