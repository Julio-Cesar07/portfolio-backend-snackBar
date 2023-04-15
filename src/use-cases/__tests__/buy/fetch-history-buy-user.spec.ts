import { InMemoryBuyProductsRepository } from '@/repositories/in-memory/in-memory-buy-products';
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-product-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { BuyProductsRepository } from '@/repositories/interfaces/buy-products-repository';
import { ProductRepository } from '@/repositories/interfaces/product-respository';
import { UserRepository } from '@/repositories/interfaces/user-repository';
import { FetchHistoryBuyUserUseCase } from '@/use-cases/buy/fetch-history-buy-user';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

let userRepository: UserRepository;
let productRepository: ProductRepository;
let buyProductsRepository: BuyProductsRepository;
let sut: FetchHistoryBuyUserUseCase;

describe('Fetch User Buy History Use Case', () => {
	beforeEach(async () => {
		userRepository = new InMemoryUserRepository();
		productRepository = new InMemoryProductRepository();
		buyProductsRepository = new InMemoryBuyProductsRepository();

		sut = new FetchHistoryBuyUserUseCase(buyProductsRepository, userRepository);

		await userRepository.create({
			id: 'user-01',
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password_hash: await hash('123456', 6),
			amount: 80
		});

		const products = [];

		for(let i = 0; i < 3; i++){
			const product = await productRepository.create({
				price: 22 + i,
				snackBar_id: `snackBar-0${i}`,
				title: `Sandwich ${i}`,
				description: `Um bom sandwich ${i}`
			});

			products.push(product);
		}

		await buyProductsRepository.buyProducts({
			user_id: 'user-01',
			products: {
				connect: products
			}
		});

		products.push(await productRepository.create({
			price: 22,
			snackBar_id: 'snackBar-0',
			title: 'Sandwich',
			description: 'Um bom sandwich'
		}));
        
		await buyProductsRepository.buyProducts({
			user_id: 'user-01',
			products: {
				connect: products
			}
		});
	});
    
	it('should be able fetch user history buy', async () => {
		const { buys } = await sut.execute({
			userId: 'user-01',
			page: 1,
		});

		expect(buys).toHaveLength(2);
	});

	it('should be able fetch paginated user history buy', async () => {
		await userRepository.create({
			id: 'user-02',
			name: 'JohnDoe',
			email: 'johndoe@example.com',
			birth: new Date(2000, 0, 12),
			password_hash: await hash('123456', 6),
			amount: 80
		});

		const product = await productRepository.create({
			price: 22,
			snackBar_id: 'snackBar-02',
			title: 'Sandwich',
			description: 'Um bom sandwich'
		});

		for(let i = 0; i < 24; i++)
			await buyProductsRepository.buyProducts({
				user_id: 'user-02',
				products: {
					connect: product
				}
			});


		const { buys } = await sut.execute({
			userId: 'user-02',
			page: 2,
		});

		expect(buys).toHaveLength(4);
	});
});