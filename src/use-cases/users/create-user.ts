import { UserRepository } from '@/repositories/interfaces/user-repository';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

interface CreateUserUseCaseRequest {
    name: string,
    email: string,
    password: string,
	role?: 'MEMBER' | 'ADMIN',
    birth: Date,
}

interface CreateUserUseCaseResponse {
    user: User
}

export class CreateUserUseCase{
	constructor(private userRepository: UserRepository){}

	async execute({
		name,
		email,
		password,
		role,
		birth
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse>{
		const password_hash = await hash(password, 6);

		const emailAlreadyExist = await this.userRepository.findUniqueEmail(email);

		if (emailAlreadyExist)
			throw new UserAlreadyExistsError;

		const user = await this.userRepository.create({
			name,
			email,
			password_hash,
			role,
			birth
		});

		return {
			user
		};
	}
}