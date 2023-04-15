import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { SnackBar } from '@prisma/client';

interface FetchSnackBarByUserIdUseCaseRequest{
    userId: string,
    page: number
}

interface FetchSnackBarByUserIdUseCaseResponse{
    snackBars: SnackBar[]
}

export class FetchSnackBarByUserIdUseCase{
	constructor(private snackBarRepository: SnackBarRepository){}

	async execute({
		userId,
		page
	}: FetchSnackBarByUserIdUseCaseRequest): Promise<FetchSnackBarByUserIdUseCaseResponse>{
		const snackBars = await this.snackBarRepository.findByUserId(userId, page);

		return {
			snackBars
		};
	}
}