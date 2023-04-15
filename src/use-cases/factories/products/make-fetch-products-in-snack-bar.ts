import { PrismaProductRepository } from '@/repositories/prisma/prisma-product-repository';
import { PrismaSnackBarRepository } from '@/repositories/prisma/prisma-snackBar-repository';
import { FetchProductsInSnackBar } from '@/use-cases/products/fetch-products-in-snackbar';

export function makeFetchProductsInSnackBar() {
	const productRepository = new PrismaProductRepository();
	const snackBarRepository = new PrismaSnackBarRepository();
	const fetchProducts = new FetchProductsInSnackBar(productRepository, snackBarRepository);

	return fetchProducts;
}