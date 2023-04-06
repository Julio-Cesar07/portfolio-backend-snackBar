import { SnackBar } from '@prisma/client';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreateSnackBarUseCaseRequest{
    name: string,
    description?: string,
    addressStreet: string,
    addressNumber: string,
    addressCity: string,
    user_id: string
}

interface CreateSnackBarUseCaseResponse{
    snackBar: SnackBar
}

export class CreateSnackBarUseCase{
	constructor(private snackBarRepository: SnackBarRepository,
		private userRepository: UserRepository){}

	async execute({
		name,
		addressCity,
		addressNumber,
		addressStreet,
		user_id,
		description
	}: CreateSnackBarUseCaseRequest): Promise<CreateSnackBarUseCaseResponse> {
		const user = await this.userRepository.findById(user_id);

		if(!user)
			throw new ResourceNotFoundError;
		
		const snackBar = await this.snackBarRepository.create({
			addressCity,
			addressNumber,
			addressStreet,
			name,
			user_id,
			description,
		});

		return {
			snackBar
		};
	}
}