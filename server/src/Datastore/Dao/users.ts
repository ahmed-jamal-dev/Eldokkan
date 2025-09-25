import { User } from "@/types";

export interface userDao {
    createUser(user: Omit<User,"id"|"created_at">): Promise<User>;
    getUserById(id:string):Promise<User|undefined>
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByuserName(userName: string): Promise<User | undefined>;
    listUsers():Promise<User[]>
    deleteUser(id:string):Promise<void>
}