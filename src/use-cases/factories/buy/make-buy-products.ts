import { PrismaBuyProductsRepository } from '@/repositories/prisma/prisma-buy-repository';
import { PrismaProductRepository } from '@/repositories/prisma/prisma-product-repository';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { BuyProductsUseCase } from '@/use-cases/buy/buy-products';

export function makeBuyProducts(){
	const userRepository = new PrismaUserRepository();
	const productRepository = new PrismaProductRepository();
	const buyProductsRepository = new PrismaBuyProductsRepository();
	const buyProducts = new BuyProductsUseCase(userRepository, productRepository, buyProductsRepository);

	return buyProducts;
}