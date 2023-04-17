import { BuyProductsRepository } from '@/repositories/interfaces/buy-products-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { Buy } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { ProductDoesntExistError } from '../errors/product-doesnt-exist-error';
import { InsufficientFundsError } from '../errors/insufficient-funds-error';
import { EmptyBuyError } from '../errors/empty-buy-error';
import { DifferentSnackBarError } from '../errors/different-snackBar-error';

interface BuyProductsUseCaseRequest {
    userId: string,
    products: { id: string }[]
}

interface BuyProductsUseCaseResponse {
    buy: Buy
}

export class BuyProductsUseCase {
	constructor(private userRepository: UserRepository,
        private productRepository: ProductRepository,
        private buyRepository: BuyProductsRepository){}

	async execute({
		userId,
		products
	}: BuyProductsUseCaseRequest): Promise<BuyProductsUseCaseResponse>{
		if(products.length < 1)
			throw new EmptyBuyError;
			
		const user = await this.userRepository.findById(userId);

		if(!user)
			throw new ResourceNotFoundError;

		let sumProductsPrice = 0;

		let product = await this.productRepository.findById(products[0].id);

		if (!product)
			throw new ProductDoesntExistError;

		sumProductsPrice += product.price.toNumber();

		const productSnackBarId = product.snackBar_id;

		for(let i = 1; i < products.length; i++){
			product = await this.productRepository.findById(products[i].id);

			if (!product)
				throw new ProductDoesntExistError;

			if(productSnackBarId !== product.snackBar_id)
				throw new DifferentSnackBarError;

			sumProductsPrice += product.price.toNumber();
		}

		if(user.amount.toNumber() < sumProductsPrice)
			throw new InsufficientFundsError;

		const buy = await this.buyRepository.buyProducts({user_id: userId}, products);

		const amountUpdate = (sumProductsPrice) * -1;

		console.log('aqui porra ', amountUpdate);
		await this.userRepository.alterAmount(user.id, amountUpdate);

		return {
			buy,
		};
	}
}