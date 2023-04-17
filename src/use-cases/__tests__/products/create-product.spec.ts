import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository';
import { InMemorySnackBarRepository } from '@/repositories/in-memory/in-memory-snack-bar-repository';
import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { SnackBarNotValidateError } from '@/use-cases/errors/snackBar-not-validate-error';
import { UserIsntOwnerSnackBarError } from '@/use-cases/errors/user-isnt-owner-snackBar-error';
import { CreateProductUseCase } from '@/use-cases/products/create-product';
import { beforeEach, describe, expect, it } from 'vitest';

let productRepository: ProductRepository;
let snackBarRepository: SnackBarRepository;
let sut: CreateProductUseCase;

describe('Create a Product Use Case', () => {
	beforeEach(async () => {
		snackBarRepository = new InMemorySnackBarRepository();
		productRepository = new InMemoryProductRepository();
		sut = new CreateProductUseCase(productRepository, snackBarRepository);

		await snackBarRepository.create({
			id: 'snackBar-01',
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git',
			user_id: 'user-01',
			status: 'CHECKED'
		});
	});

	it('should be able create a product', async () => {
		const { product } = await sut.execute({
			price: 22,
			snackBar_id: 'snackBar-01',
			title: 'Sandwich',
			description: 'Um bom sandwich',
			userId: 'user-01',
		});

		expect(product.id).toEqual(expect.any(String));
		expect(product.price.toNumber()).toEqual(22);
	});

	it('should not be able create a product without a snack bar created', async () => {
		await expect(() => 
			sut.execute({
				price: 22,
				snackBar_id: 'snackBar-02',
				title: 'Sandwich',
				description: 'Um bom sandwich',
				userId: 'user-01',
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able create a product without a snack bar checked', async () => {

		await snackBarRepository.create({
			id: 'snackBar-02',
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git',
			user_id: 'user-01',
		});


		await expect(() => 
			sut.execute({
				price: 22,
				snackBar_id: 'snackBar-02',
				title: 'Sandwich',
				description: 'Um bom sandwich',
				userId: 'user-01',
			})
		).rejects.toBeInstanceOf(SnackBarNotValidateError);
	});

	it('should not be able create a product in snack bar that the user isnt owner', async () => {

		await snackBarRepository.create({
			id: 'snackBar-02',
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git',
			user_id: 'user-01',
		});


		await expect(() => 
			sut.execute({
				price: 22,
				snackBar_id: 'snackBar-02',
				title: 'Sandwich',
				description: 'Um bom sandwich',
				userId: 'user-02',
			})
		).rejects.toBeInstanceOf(UserIsntOwnerSnackBarError);
	});
});