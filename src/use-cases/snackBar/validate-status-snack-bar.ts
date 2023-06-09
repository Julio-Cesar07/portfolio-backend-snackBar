import { SnackBar } from '@prisma/client';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface ValidateStatusSnackBarUseCaseRequest{
    snackBarId: string
}

interface ValidateStatusSnackBarUseCaseResponse{
    snackBar: SnackBar
}

export class ValidateStatusSnackBarUseCase{
	constructor(private snackBarRepository: SnackBarRepository){}

	async execute({
		snackBarId
	}: ValidateStatusSnackBarUseCaseRequest): Promise<ValidateStatusSnackBarUseCaseResponse>{
		const snackBar = await this.snackBarRepository.validateStatus(snackBarId, {roleToVerify: 'CHECKED'});

		if(!snackBar)
			throw new ResourceNotFoundError;

		return {
			snackBar
		};
	}
}