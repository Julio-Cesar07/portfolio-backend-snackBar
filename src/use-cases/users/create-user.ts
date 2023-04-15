import { UserRepository } from '@/repositories/interfaces/user-repository';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

interface CreateUserUseCaseRequest {
    name: string,
    email: string,
    password: string,
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
		birth
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse>{
		const emailAlreadyExist = await this.userRepository.findUniqueEmail(email);
		
		if (emailAlreadyExist)
			throw new UserAlreadyExistsError;
			
		const password_hash = await hash(password, 6);

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