import { PrismaSnackBarRepository } from '@/repositories/prisma/prisma-snackBar-repository';
import { ValidateStatusSnackBarUseCase } from '@/use-cases/snackBar/validate-status-snack-bar';

export function makeValidateStatusSnackBar(){
	const snackBarRepository = new PrismaSnackBarRepository();
	const validateStatusSnackBar = new ValidateStatusSnackBarUseCase(snackBarRepository);

	return validateStatusSnackBar;
}