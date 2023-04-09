import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { Product } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreateProductUseCaseRequest{
    description?: string,
    price: number,
    snackBar_id: string,
    title: string,
}

interface CreateProductUseCaseResponse{
    product: Product
}

export class CreateProductUseCase {
	constructor(private productRepository: ProductRepository,
        private snackBarRepository: SnackBarRepository){}

	async execute({
		price,
		snackBar_id,
		title,
		description
	}: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse>{
		const snackBar = await this.snackBarRepository.findById(snackBar_id);

		if(!snackBar)
			throw new ResourceNotFoundError;
        
		const product = await this.productRepository.create({
			price,
			snackBar_id,
			title,
			description
		});

		return  {
			product
		};
	}
}