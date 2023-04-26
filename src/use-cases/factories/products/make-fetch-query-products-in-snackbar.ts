import { PrismaProductRepository } from '@/repositories/prisma/prisma-product-repository';
import { FetchQueryProductsInSnackBar } from '@/use-cases/products/fetch-query-products-in-snackbar';

export function makeFetchQueryProductsSnackbar(){
	const productRepository = new PrismaProductRepository();
	const fetchQuery = new FetchQueryProductsInSnackBar(productRepository);

	return fetchQuery;
}