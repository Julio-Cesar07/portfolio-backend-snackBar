import { PrismaSnackBarRepository } from '@/repositories/prisma/prisma-snackBar-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { CreateSnackBarUseCase } from '@/use-cases/snackBar/create-snackBar';

export function makeCreateSnackBar(){
	const snackBarRepository = new PrismaSnackBarRepository();
	const userRepository = new PrismaUserRepository();
	const createSnackBar = new CreateSnackBarUseCase(snackBarRepository, userRepository);

	return createSnackBar;
}