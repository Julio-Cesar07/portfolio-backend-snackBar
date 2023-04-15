import { PrismaProductRepository } from '@/repositories/prisma/prisma-product-repository';
import { PrismaSnackBarRepository } from '@/repositories/prisma/prisma-snackBar-repository';
import { CreateProductUseCase } from '@/use-cases/products/create-product';

export function makeCreateProducts() {
	const productRepository = new PrismaProductRepository();
	const snackBarRepository = new PrismaSnackBarRepository();
	const createProducts = new CreateProductUseCase(productRepository, snackBarRepository);

	return createProducts;
}