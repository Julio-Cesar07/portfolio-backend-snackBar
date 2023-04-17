import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from '../interfaces/product-respository';
import { randomUUID } from 'crypto';
import { numberPagesPagination } from '@/utils/number-pages-pagination';

export class InMemoryProductRepository implements ProductRepository{
	public items: Product[] = [];
	async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
		const product:Product = {
			id: data.id ?? randomUUID(),
			created_at: new Date(),
			description: data.description ?? null,
			price: new Prisma.Decimal(data.price.toString()),
			snackBar_id: data.snackBar_id,
			title: data.title,
		};

		this.items.push(product);

		return product;
	}

	async findById(productId: string): Promise<Product | null> {
		const product = this.items.find(item => item.id === productId);

		return product ?? null;
	}

	async findByQuery(query: string, page: number): Promise<Product[]> {
		const products = this.items
			.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
			.slice((page - 1) * numberPagesPagination, page*numberPagesPagination);

		return products;
	}

	async findAllBySnackBarId(snackBarId: string, page: number): Promise<Product[]> {
		const products = this.items
			.filter(item => item.snackBar_id === snackBarId)
			.slice((page - 1) * numberPagesPagination, page * numberPagesPagination);

		return products;
	}
}