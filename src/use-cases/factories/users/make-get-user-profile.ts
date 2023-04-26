import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserProfileUseCase } from '../../users/get-user-profile';

export function makeGetUserProfile(){
	const userRepository = new PrismaUserRepository();
	const getUserProfile = new GetUserProfileUseCase(userRepository);

	return getUserProfile;
}