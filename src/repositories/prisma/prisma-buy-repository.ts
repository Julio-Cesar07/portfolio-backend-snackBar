import { Prisma, Buy } from '@prisma/client';
import { BuyProductsRepository } from '../interfaces/buy-products-repository';
import { prisma } from '@/lib/prisma';
import { numberPagesPagination } from '@/utils/number-pages-pagination';

export class PrismaBuyProductsRepository implements BuyProductsRepository{
	async buyProducts(data: Prisma.BuyUncheckedCreateInput, products: {id: string}[]): Promise<Buy> {
		const buy = await prisma.buy.create({
			data: {
				id: data.id,
				created_at: data.created_at,
				user_id: data.user_id,
				products: {
					connect: products.map(item => {
						return {id: item.id};
					})
				}	
			}
		});

		return buy;
	}
	
	async historyBuyUser(userId: string, page: number): Promise<Buy[]> {
		const buys = await prisma.buy.findMany({
			where: {
				user_id: userId
			},
			take: numberPagesPagination,
			skip: (page -1) * numberPagesPagination,
			orderBy: {
				created_at: 'asc'
			}
		});

		return buys;
	}

}