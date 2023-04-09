import { Prisma, Buy } from '@prisma/client';
import { BuyProductsRepository } from '../interfaces/buy-products-repository';
import { randomUUID } from 'crypto';
import { numberPagesPagination } from '@/utils/number-pages-pagination';

type BuyProducts = Buy & {products: Prisma.Enumerable<Prisma.ProductWhereUniqueInput> | null}

export class InMemoryBuyProductsRepository implements BuyProductsRepository{
	public items: BuyProducts[] = [];
	async buyProducts(data: Prisma.BuyUncheckedCreateInput): Promise<Buy> {
		const buy: BuyProducts = {
			id: data.id ?? randomUUID(),
			created_at: new Date(),
			user_id: data.user_id,
			products: data.products?.connect ?? null
		};   

		this.items.push(buy);

		return buy;
	}

	async historyBuyUser(userId: string, page: number): Promise<Buy[]> {
		const buys = this.items
			.filter(item => item.user_id === userId)
			.slice((page -1 ) * numberPagesPagination, page * numberPagesPagination);

		return buys;
	}
}