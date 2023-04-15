import { PrismaSnackBarRepository } from '@/repositories/prisma/prisma-snackBar-repository';
import { FetchSnackBarByUserIdUseCase } from '@/use-cases/snackBar/fetch-snackBar-by-userId';

export function makeFetchSnackBarByUserId(){
	const snackBarRepository = new PrismaSnackBarRepository();
	const fetchSnackBarByUserId = new FetchSnackBarByUserIdUseCase(snackBarRepository);

	return fetchSnackBarByUserId;
}