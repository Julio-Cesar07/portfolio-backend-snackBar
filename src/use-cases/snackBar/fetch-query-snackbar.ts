import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { SnackBar } from '@prisma/client';

interface FetchQuerySnackBarRequest{
    query: string,
	page: number
}

interface FetchQuerySnackBarResponse{
    snackBars: SnackBar[]
}

export class FetchQuerySnackBar {
	constructor(private snackBarRepository: SnackBarRepository){}

	async execute({
		query,
		page
	}: FetchQuerySnackBarRequest): Promise<FetchQuerySnackBarResponse>{        
		const snackBars = await this.snackBarRepository.findByQuery(query, page);

		return  {
			snackBars
		};
	}
}