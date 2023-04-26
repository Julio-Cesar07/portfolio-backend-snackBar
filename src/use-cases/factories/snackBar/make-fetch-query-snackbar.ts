import { PrismaSnackBarRepository } from '@/repositories/prisma/prisma-snackBar-repository';
import { FetchQuerySnackBar } from '@/use-cases/snackBar/fetch-query-snackbar';

export function makeFetchQuerySnackBar(){
	const snackBarRepository = new PrismaSnackBarRepository();
	const fetchQuery = new FetchQuerySnackBar(snackBarRepository);

	return fetchQuery;
}