import { PrismaBuyProductsRepository } from '@/repositories/prisma/prisma-buy-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { FetchHistoryBuyUserUseCase } from '@/use-cases/buy/fetch-history-buy-user';

export function makeFetchHistoryBuyUser(){
	const buyProductsRepository = new PrismaBuyProductsRepository();
	const userRepository = new PrismaUserRepository();
	const fetchHistory = new FetchHistoryBuyUserUseCase(buyProductsRepository, userRepository);

	return fetchHistory;
}