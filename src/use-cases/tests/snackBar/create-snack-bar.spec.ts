import { InMemorySnackBarRepository } from '@/repositories/in-memory/in-memory-snack-bar-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { CreateSnackBarUseCase } from '@/use-cases/snackBar/create-snackBar';
import { hash } from 'bcryptjs';
import { describe, beforeEach, it, expect } from 'vitest';

let snackBarRepository: SnackBarRepository;
let userRepository: UserRepository;
let sut: CreateSnackBarUseCase;

describe('Create a Snack Bar Use Case', () => {
	beforeEach(async () => {
		userRepository = new InMemoryUserRepository();
		snackBarRepository = new InMemorySnackBarRepository();
		sut = new CreateSnackBarUseCase(snackBarRepository, userRepository);
	
		await userRepository.create({
			id: 'user-01',
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password_hash: await hash('123456', 6)
		});
	});

	it('should be able to create a snack bar', async () => {
		const { snackBar } = await sut.execute({
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git',
			user_id: 'user-01',
		});

		expect(snackBar.id).toEqual(expect.any(String));
	});

	it('should not be able to create a snack bar without a user created', async () => {
		await expect(() => 
			sut.execute({
				addressCity: 'Santos',
				addressNumber: '45698',
				addressStreet: 'Rua de fulano',
				name: 'Snack Bar Git',
				user_id: 'user-02',
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});