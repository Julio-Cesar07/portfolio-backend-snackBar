import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../interfaces/user-repository';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export class InMemoryUserRepository implements UserRepository{
	public items: User[] = [];
    
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user: User = {
			id: data.id ?? randomUUID(),
			email: data.email,
			password_hash: data.password_hash,
			name: data.name,
			amount: data.amount ? new Prisma.Decimal(data.amount.toString()) : new Prisma.Decimal(0),
			created_at: new Date(),
			birth: data.birth ? new Date(data.birth) : new Date(2000, 0, 1, 13, 40),
			role: data.role ?? 'MEMBER'
		};

		this.items.push(user);

		return user;
	}
	async findById(userId: string): Promise<User | null> {
		const user = this.items.find(item => item.id === userId);

		return user ?? null;
	}
	async findUniqueEmail(email: string): Promise<User | null> {
		const user = this.items.find(item => item.email === email);

		return user ?? null;
	}

	async alterAmount(userId: string, amount: number): Promise<number> {
		const userIndex = this.items.findIndex(item => item.id === userId);

		if(userIndex === -1)
			throw new ResourceNotFoundError;

		const amountCount = this.items[userIndex].amount.toNumber();

		this.items[userIndex].amount = new Prisma.Decimal(amount + amountCount);

		return this.items[userIndex].amount.toNumber(); 
	}
}