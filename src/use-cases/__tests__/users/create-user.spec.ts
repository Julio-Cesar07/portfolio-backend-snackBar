import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { CreateUserUseCase } from '@/use-cases/users/create-user';
import { compare } from 'bcryptjs';
import { describe, expect, it, beforeEach } from 'vitest';

let userRepository: UserRepository;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		sut = new CreateUserUseCase(userRepository);
	});

	it('should be able to create a user', async () => {
		const { user } = await sut.execute({
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password: '123456'
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not be able to create two user with same e-mail', async () => {
		await sut.execute({
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password: '123456'
		});

		await expect(() => 
			sut.execute({
				name: 'JohnDoe2',
				email: 'johndoe@example.com',
				birth: new Date(2001, 0, 12),
				password: '1234567'
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password: '123456'
		});

		const isPasswordHashCorretly = await compare(
			'123456', user.password_hash
		);

		expect(isPasswordHashCorretly).toBe(true);
	});
});