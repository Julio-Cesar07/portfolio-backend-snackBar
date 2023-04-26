import { InMemoryBuyProductsRepository } from '@/repositories/in-memory/in-memory-buy-products';
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { BuyProductsRepository } from '@/repositories/interfaces/buy-products-repository';
import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { BuyProductsUseCase } from '@/use-cases/buy/buy-products';
import { DifferentSnackBarError } from '@/use-cases/errors/different-snackBar-error';
import { EmptyBuyError } from '@/use-cases/errors/empty-buy-error';
import { InsufficientFundsError } from '@/use-cases/errors/insufficient-funds-error';
import { ProductDoesntExistError } from '@/use-cases/errors/product-doesnt-exist-error';
import { Prisma, Product } from '@prisma/client';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

let userRepository: UserRepository;
let productRepository: ProductRepository;
let buyProductsRepository: BuyProductsRepository;
let sut: BuyProductsUseCase;

describe('Buy a Product Use Case', () => {
	beforeEach(async () => {
		userRepository = new InMemoryUserRepository();
		productRepository = new InMemoryProductRepository();
		buyProductsRepository = new InMemoryBuyProductsRepository();

		sut = new BuyProductsUseCase(userRepository, productRepository, buyProductsRepository);

		await userRepository.create({
			id: 'user-01',
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password_hash: await hash('123456', 6),
			amount: 80
		});

	});
    
	it('should be able to buy multiple products', async () => {

		const products = [];

		for(let i = 0; i < 3; i++){
			const product = await productRepository.create({
				price: 22 + i,
				snackBar_id: 'snackBar-01',
				title: `Sandwich ${i}`,
				description: `Um bom sandwich ${i}`
			});

			products.push(product);
		}

		const { buy } = await sut.execute({
			userId: 'user-01',
			products,
		});

		expect(buy.id).toEqual(expect.any(String));
	});

	it('should not be able to buy a product that not exist', async () => {

		const products: Product[] = [];

		// product not registered
		products.push({
			id: 'product-not-exist',
			created_at: new Date(),
			price: new Prisma.Decimal(22),
			snackBar_id: 'snackBar-0',
			title: 'Sandwich',
			description: 'Um bom sandwich'
		});

		await expect(() => 
			sut.execute({
				userId: 'user-01',
				products,
			})
		).rejects.toBeInstanceOf(ProductDoesntExistError);
	});

	it('should not be able to buy a product when the user doesnt have enough balance', async () => {

		const products: Product[] = [];

		// product not registered
		for(let i = 0; i < 3; i++){
			const product = await productRepository.create({
				price: 80 + i,
				snackBar_id: 'snackBar-01',
				title: `Sandwich ${i}`,
				description: `Um bom sandwich ${i}`
			});

			products.push(product);
		}

		await expect(() => 
			sut.execute({
				userId: 'user-01',
				products,
			})
		).rejects.toBeInstanceOf(InsufficientFundsError);
	});

	it('should not be able to buy without products', async () => {
		const products: Product[] = [];

		await expect(() => 
			sut.execute({
				userId: 'user-01',
				products,
			})
		).rejects.toBeInstanceOf(EmptyBuyError);
	});

	it('should not be able to buy multiple products in different snack bars', async () => {

		const products: Product[] = [];

		for(let i = 0; i < 3; i++){
			const product = await productRepository.create({
				price: 22 + i,
				snackBar_id: `snackBar-0${i}`,
				title: `Sandwich ${i}`,
				description: `Um bom sandwich ${i}`
			});

			products.push(product);
		}

		await expect(() => 
			sut.execute({
				userId: 'user-01',
				products,
			})
		).rejects.toBeInstanceOf(DifferentSnackBarError);
	});
});