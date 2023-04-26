import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { AlterAmountUserUseCase } from '../../users/alter-amount-user';

export function makeAlterAmountUser(){
	const userRepository = new PrismaUserRepository();
	const alterAmountUseCase = new AlterAmountUserUseCase(userRepository);

	return alterAmountUseCase;
}