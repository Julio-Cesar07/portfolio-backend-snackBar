import { BuyProductsRepository } from '@/repositories/interfaces/buy-products-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { Buy } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface FetchHistoryBuyUserUseCaseRequest {
    userId: string,
    page: number
}

interface FetchHistoryBuyUserUseCaseResponse {
    buys: Buy[]
}

export class FetchHistoryBuyUserUseCase {
	constructor(private buyProductsRepository: BuyProductsRepository,
        private userRepository: UserRepository){}

	async execute({
		userId,
		page
	}: FetchHistoryBuyUserUseCaseRequest): Promise<FetchHistoryBuyUserUseCaseResponse> {
		const user = await this.userRepository.findById(userId);

		if(!user)
			throw new ResourceNotFoundError;

		const buys = await this.buyProductsRepository.historyBuyUser(userId, page);

		return {
			buys
		};
	}
}