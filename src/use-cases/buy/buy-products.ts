import { BuyProductsRepository } from '@/repositories/interfaces/buy-products-repository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { Buy, Prisma, Product } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { ProductDoesntExistError } from '../errors/product-doesnt-exist-error';
import { InsufficientFundsError } from '../errors/insufficient-funds-error';
import { EmptyBuyError } from '../errors/empty-buy-error';
import { DifferentSnackBarError } from '../errors/different-snackBar-error';

interface BuyProductsUseCaseRequest {
    user_id: string,
    products: Product[]
}

interface BuyProductsUseCaseResponse {
    buy: Buy
}

export class BuyProductsUseCase {
	constructor(private userRepository: UserRepository,
        private productRepository: ProductRepository,
        private buyRepository: BuyProductsRepository){}

	async execute({
		user_id,
		products
	}: BuyProductsUseCaseRequest): Promise<BuyProductsUseCaseResponse>{
		if(products.length < 1)
			throw new EmptyBuyError;
			
		const user = await this.userRepository.findById(user_id);

		if(!user)
			throw new ResourceNotFoundError;

		let sumProductsPrice = 0;
		const productSnackBarId = products[0].snackBar_id;

		for(let i = 0; i < products.length; i++){
			if(productSnackBarId !== products[i].snackBar_id)
				throw new DifferentSnackBarError;
			const product = await this.productRepository.findById(products[i].id);

			if (!product)
				throw new ProductDoesntExistError;

			sumProductsPrice += product.price.toNumber();
		}

		if(user.amount.toNumber() < sumProductsPrice)
			throw new InsufficientFundsError;

		user.amount = new Prisma.Decimal(user.amount.toNumber() - sumProductsPrice);

		const buy = await this.buyRepository.buyProducts({
			user_id,
			products: {
				connect: products
			}
		});

		return {
			buy,
		};
	}
}