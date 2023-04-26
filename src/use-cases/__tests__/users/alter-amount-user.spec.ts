import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { AlterAmountUserUseCase } from '@/use-cases/users/alter-amount-user';
import { hash } from 'bcryptjs';
import { describe, it, beforeEach, expect, } from 'vitest';

let userRepository: UserRepository;
let sut: AlterAmountUserUseCase;

describe('Alter Amount Use Case', () => {
	beforeEach(async () => {
		userRepository = new InMemoryUserRepository();
		sut = new AlterAmountUserUseCase(userRepository);

		await userRepository.create({
			id: 'user-01',
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password_hash: await hash('123456', 6),
			amount: 800
		});
	});

	it('should be able increase the amount', async () => {
		const { userAmount } = await sut.execute({
			userId: 'user-01',
			amount: 1000
		});
        
		expect(userAmount).toEqual(1800);
	});

	it('should be able decrease the amount', async () => {
		const { userAmount } = await sut.execute({
			userId: 'user-01',
			amount: -100
		});
        
		expect(userAmount).toEqual(700);
	});

	it('should not be able alter the amount of a user that doesnt exist', async () => {
		await expect(() => 
			sut.execute({
				userId: 'user-02',
				amount: 1000
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});