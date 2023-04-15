import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository';
import { InMemorySnackBarRepository } from '@/repositories/in-memory/in-memory-snack-bar-repository';
import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { FetchProductsInSnackBar } from '@/use-cases/products/fetch-products-in-snackbar';
import { Product } from '@prisma/client';
import { beforeEach, describe, expect, it } from 'vitest';

let productRepository: ProductRepository;
let snackBarRepository: SnackBarRepository;
let sut: FetchProductsInSnackBar;

describe('Fetch Products In Snack Bar Use Case', () => {
	beforeEach(() => {
		snackBarRepository = new InMemorySnackBarRepository();
		productRepository = new InMemoryProductRepository();
		sut = new FetchProductsInSnackBar(productRepository, snackBarRepository);

		snackBarRepository.create({
			id: 'snackBar-01',
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git',
			user_id: 'user-01',
		});
	});

	it('should be able fetch products in a snack bar', async () => {
		const productsCreated: Product[] = [];

		// product not registered
		for(let i = 0; i < 3; i++){
			const product = await productRepository.create({
				price: 22 + i,
				snackBar_id: 'snackBar-01',
				title: `Sandwich ${i}`,
				description: `Um bom sandwich ${i}`
			});

			productsCreated.push(product);
		}

		await productRepository.create({
			price: 22,
			snackBar_id: 'snackBar-02',
			title: 'Sandwich',
			description: 'Um bom sandwich'
		});

		const { products } = await sut.execute({
			snackBarId: 'snackBar-01',
			page: 1,
		});

		expect(products).toHaveLength(3);
		expect(products).toEqual([
			expect.objectContaining({ snackBar_id: 'snackBar-01'}),
			expect.objectContaining({ snackBar_id: 'snackBar-01'}),
			expect.objectContaining({ snackBar_id: 'snackBar-01'}),
		]);
	});

	it('should be able fetch paginated products in a snack bar', async () => {
		const productsCreated: Product[] = [];

		// product not registered
		for(let i = 0; i < 24; i++){
			const product = await productRepository.create({
				price: 22 + i,
				snackBar_id: 'snackBar-01',
				title: `Sandwich ${i}`,
				description: `Um bom sandwich ${i}`
			});

			productsCreated.push(product);
		}

		await productRepository.create({
			price: 22,
			snackBar_id: 'snackBar-02',
			title: 'Sandwich',
			description: 'Um bom sandwich'
		});

		const { products } = await sut.execute({
			snackBarId: 'snackBar-01',
			page: 2,
		});

		expect(products).toHaveLength(4);
		expect(products).toEqual([
			expect.objectContaining({ snackBar_id: 'snackBar-01'}),
			expect.objectContaining({ snackBar_id: 'snackBar-01'}),
			expect.objectContaining({ snackBar_id: 'snackBar-01'}),
			expect.objectContaining({ snackBar_id: 'snackBar-01'}),
		]);
	});
});