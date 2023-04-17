import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from '../interfaces/product-respository';
import { prisma } from '@/lib/prisma';
import { numberPagesPagination } from '@/utils/number-pages-pagination';

export class PrismaProductRepository implements ProductRepository{
	async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
		const product = await prisma.product.create({
			data,
		});

		return product;
	}
	async findById(productId: string): Promise<Product | null> {
		const snackBar = await prisma.product.findFirst({
			where: {
				id: productId
			}
		});

		return snackBar;
	}

	async findByQuery(query: string, page: number): Promise<Product[]> {
		const products = await prisma.product.findMany({
			where: {
				title: {
					contains: query,
				}
			},
			take: numberPagesPagination,
			skip: (page - 1) * numberPagesPagination
		});

		return products;
	}

	async findAllBySnackBarId(snackBarId: string, page: number): Promise<Product[]> {
		const products = await prisma.product.findMany({
			where: {
				snackBar_id: snackBarId,
			},
			skip: (page - 1) * numberPagesPagination,
			take: numberPagesPagination
		});

		return products;
	}

}