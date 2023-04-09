import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { Product } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface FetchProductsInSnackBarRequest{
    snackBar_id: string,
	page: number
}

interface FetchProductsInSnackBarResponse{
    products: Product[]
}

export class FetchProductsInSnackBar {
	constructor(private productRepository: ProductRepository,
        private snackBarRepository: SnackBarRepository){}

	async execute({
		snackBar_id,
		page
	}: FetchProductsInSnackBarRequest): Promise<FetchProductsInSnackBarResponse>{
		const snackBar = await this.snackBarRepository.findById(snackBar_id);

		if(!snackBar)
			throw new ResourceNotFoundError;
        
		const products = await this.productRepository.findAllBySnackBarId(snackBar_id, page);

		return  {
			products
		};
	}
}