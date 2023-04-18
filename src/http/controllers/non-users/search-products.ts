import { makeFetchQueryProductsSnackbar } from '@/use-cases/factories/products/make-fetch-query-products-in-snackbar';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function searchProducts(request: FastifyRequest, reply: FastifyReply){
	const fetchQuerySchema = z.object({
		query: z.string(),
		page: z.coerce.number().min(1).default(1)
	});

	const { query, page } = fetchQuerySchema.parse(request.query);


	const fetchQuery = makeFetchQueryProductsSnackbar();

	const { products } = await fetchQuery.execute({
		page,
		query
	});

	return reply.status(200).send({ products,});
}