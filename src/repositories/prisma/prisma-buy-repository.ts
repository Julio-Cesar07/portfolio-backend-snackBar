import { Prisma, Buy } from '@prisma/client';
import { BuyProductsRepository } from '../interfaces/buy-products-repository';
import { prisma } from '@/lib/prisma';
import { numberPagesPagination } from '@/utils/number-pages-pagination';

export class PrismaBuyProductsRepository implements BuyProductsRepository{
	async buyProducts(data: Prisma.BuyUncheckedCreateInput): Promise<Buy> {
		console.log(data);
		const buy = await prisma.buy.create({
			data,
		});

		return buy;
	}
	async historyBuyUser(userId: string, page: number): Promise<Buy[]> {
		const buys = await prisma.buy.findMany({
			where: {
				user_id: userId
			},
			take: numberPagesPagination,
			skip: (page -1) * numberPagesPagination
		});

		return buys;
	}

}