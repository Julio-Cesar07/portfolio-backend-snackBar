import { prisma } from '@/lib/prisma';
import { FastifyInstance } from 'fastify';

export async function createAndReturnIdProduct(app: FastifyInstance, snackBar_id: string, data : {
    price: number | null,
    title: string | null,
    description: string | null
} | null){
	const { id } = await prisma.product.create({
		data: {
			price: data?.price ? data.price : 10,
			title: data?.title ? data.title : 'Anyway',
			description: data?.description ? data.description : 'Anyway',
			snackBar_id,
		}
	});

	return {
		id,
	};

}