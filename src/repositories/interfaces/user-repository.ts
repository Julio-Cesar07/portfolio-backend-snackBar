import { Prisma, User } from '@prisma/client';

export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findById(userId: string): Promise<User | null>
    findUniqueEmail(email: string): Promise<User | null>
    alterAmount(userId: string, amount: number): Promise<number | null>
}