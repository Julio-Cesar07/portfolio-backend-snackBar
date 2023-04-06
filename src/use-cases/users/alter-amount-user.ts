import { UserRepository } from '@/repositories/interfaces/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface AlterAmountUserUseCaseRequest{
    userId: string
    amount: number
}

interface AlterAmountUserUseCaseResponse{
    userAmount: number
}

export class AlterAmountUserUseCase {
	constructor(private userRepository: UserRepository){}

	async execute({
		userId,
		amount
	}: AlterAmountUserUseCaseRequest): Promise<AlterAmountUserUseCaseResponse>{
		const userAmount = await this.userRepository.alterAmount(userId, amount);

		if(!userAmount && userAmount !== 0)
			throw new ResourceNotFoundError;

		return {
			userAmount
		};
        
	}
}