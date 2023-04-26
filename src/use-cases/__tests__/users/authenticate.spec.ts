import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { InvalidCredentialErrors } from '@/use-cases/errors/invalid-credentials-error';
import { AuthenticateUseCase } from '@/use-cases/users/authenticate';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';


let userRepository: UserRepository;
let sut: AuthenticateUseCase;

describe('Authenticase Use Case', () => {
	beforeEach(async () => {
		userRepository = new InMemoryUserRepository();
		sut = new AuthenticateUseCase(userRepository);

		await userRepository.create({
			id: 'user-01',
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password_hash: await hash('123456', 6),
			amount: 80
		});
	});

	it('should be able to authenticate', async () => {
		const {user} = await sut.execute({
			email: 'johndoe@example.com',
			password: '123456'
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not be able to authenticate with wrong email', async () => {
		await expect(() => 
			sut.execute({
				email: 'johndoe2@example.com',
				password: '123456'
			}),
		).rejects.toBeInstanceOf(InvalidCredentialErrors);
	});
    
	it('should not be able to authenticate with wrong password', async () => {
		await expect(() => 
			sut.execute({
				email: 'johndoe@example.com',
				password: '123123'
			}),
		).rejects.toBeInstanceOf(InvalidCredentialErrors);
	});
});