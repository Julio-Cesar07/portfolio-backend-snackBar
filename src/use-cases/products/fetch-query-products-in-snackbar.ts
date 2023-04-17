import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { Product } from '@prisma/client';

interface FetchProductsInSnackBarRequest{
    query: string,
	page: number
}

interface FetchProductsInSnackBarResponse{
    products: Product[]
}

export class FetchQueryProductsInSnackBar {
	constructor(private productRepository: ProductRepository){}

	async execute({
		query,
		page
	}: FetchProductsInSnackBarRequest): Promise<FetchProductsInSnackBarResponse>{        
		const products = await this.productRepository.findByQuery(query, page);

		return  {
			products
		};
	}
}