import { UserRepository } from '@/repositories/interfaces/user-repository';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

interface CreateUserRequest {
    name: string,
    email: string,
    password: string,
    birth: Date,
}

interface CreateUserResponse {
    user: User
}

export class CreateUser{
	constructor(private userRepository: UserRepository){}

	async execute({
		name,
		email,
		password,
		birth
	}: CreateUserRequest): Promise<CreateUserResponse>{
		const password_hash = await hash(password, 6);

		const emailAlreadyExist = await this.userRepository.findUniqueEmail(email);

		if (emailAlreadyExist)
			throw new UserAlreadyExistsError;

		const user = await this.userRepository.create({
			name,
			email,
			password_hash,
			birth
		});

		return {
			user
		};
	}
}