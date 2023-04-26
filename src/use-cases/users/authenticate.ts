import { UserRepository } from '@/repositories/interfaces/user-repository';
import { InvalidCredentialErrors } from '@/use-cases/errors/invalid-credentials-error';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
	constructor(private userRepository: UserRepository){}

	async execute({
		email,
		password
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
		const user = await this.userRepository.findUniqueEmail(email);

		if(!user)
			throw new InvalidCredentialErrors;
        
		const doesPasswordMatches = await compare(password, user.password_hash);

		if(!doesPasswordMatches)
			throw new InvalidCredentialErrors;


		return {
			user,
		};
	}
}