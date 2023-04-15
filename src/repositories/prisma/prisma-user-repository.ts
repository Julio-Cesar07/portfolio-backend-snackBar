import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../interfaces/user-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUserRepository implements UserRepository{
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}
	async findById(userId: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		return user;
	}
	async findUniqueEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			}
		});

		return user;
	}
	async alterAmount(userId: string, amount: number): Promise<number> {
		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				amount: {
					increment: amount
				}
			}
		});

		return user.amount.toNumber();
	}

}