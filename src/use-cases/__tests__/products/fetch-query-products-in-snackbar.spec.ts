import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository';
import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { FetchQueryProductsInSnackBar } from '@/use-cases/products/fetch-query-products-in-snackbar';
import { describe, beforeEach, it, expect } from 'vitest';

let productRepository: ProductRepository;
let sut: FetchQueryProductsInSnackBar;

describe('Fetch Query Snack Bar Id Use Case', () => {
	beforeEach(async () => {
		productRepository = new InMemoryProductRepository();
		sut = new FetchQueryProductsInSnackBar(productRepository);

		await productRepository.create({
			price: 22,
			snackBar_id: 'snackBar-01',
			title: 'Sandwich',
			description: 'Um bom sandwich',
		});

		await productRepository.create({
			price: 22,
			snackBar_id: 'snackBar-02',
			title: 'Sandwich de presunto',
			description: 'Um ótimo sandwich',
		});

		await productRepository.create({
			price: 22,
			snackBar_id: 'snackBar-03',
			title: 'Café',
			description: 'Um bom café',
		});

		
	});

	it('should be able to fetch products by title', async () => {
		
		const { products } = await sut.execute({
			page: 1,
			query: 'sandwich'
		});


		expect(products).toHaveLength(2);
	});
});