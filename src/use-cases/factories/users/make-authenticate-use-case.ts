import { AuthenticateUseCase } from '../../users/authenticate';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';

export function makeAuthenticateUseCase(){
	const userRepository = new PrismaUserRepository(); // prisma repository
	const authenticateUseCase = new AuthenticateUseCase(userRepository);

	return authenticateUseCase;
}