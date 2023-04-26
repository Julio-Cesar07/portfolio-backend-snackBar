import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetUserProfileUseCase } from '@/use-cases/users/get-user-profile';
import { hash } from 'bcryptjs';
import { describe, expect, it, beforeEach } from 'vitest';

let userRepository: UserRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		sut = new GetUserProfileUseCase(userRepository);
	});

	it('should be able to get user profile', async () => {
		const userCreated = await userRepository.create({
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password_hash: await hash('123456', 6)
		});

		const { user } = await sut.execute({
			userId: userCreated.id
		});
        
		expect(user.id).toEqual(expect.any(String));
		expect(user.email).toEqual('johndoe@example.com');
	});

	it('should not be able to get user profile of a userId wrong', async () => {
		await expect(() => 
			sut.execute({
				userId: 'not-exists-id'
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});