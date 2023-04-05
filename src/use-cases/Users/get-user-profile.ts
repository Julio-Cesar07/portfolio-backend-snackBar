import { UserRepository } from '@/repositories/interfaces/user-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetUserProfileRequest{
    userId: string
}

interface GetUserProfileResponse{
    user: User
}

export class GetUserProfile{
	constructor(private userRepository: UserRepository){}

	async execute({
		userId
	}: GetUserProfileRequest): Promise<GetUserProfileResponse> {
		const user = await this.userRepository.findById(userId);

		if(!user)
			throw new ResourceNotFoundError;

		return {
			user,
		};
	}
}