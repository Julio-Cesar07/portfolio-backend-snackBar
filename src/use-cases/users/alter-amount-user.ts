import { UserRepository } from '@/repositories/interfaces/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InsufficientFundsError } from '../errors/insufficient-funds-error';

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
		const user = await this.userRepository.findById(userId);

		if(!user)
			throw new ResourceNotFoundError;

		if(user?.amount.toNumber() + amount < 0){
			throw new InsufficientFundsError;
		}
		
		const userAmount = await this.userRepository.alterAmount(userId, amount);

		return {
			userAmount
		};
        
	}
}