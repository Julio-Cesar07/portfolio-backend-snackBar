import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeFetchProductsInSnackBar } from '@/use-cases/factories/products/make-fetch-products-in-snack-bar';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function fetchProductsInSnackBar(request: FastifyRequest, reply: FastifyReply) {
	const fetchProductsSnackIdSchema = z.object({
		snackBarId: z.string(),
	});

	const fetchProductsPageSchema = z.object({
		page: z.coerce.number().min(1).default(1)
	});   

	const { snackBarId } = fetchProductsSnackIdSchema.parse(request.params);
	const { page } = fetchProductsPageSchema.parse(request.query);

	try {
		const fetchProducts = makeFetchProductsInSnackBar();

		const { products } = await fetchProducts.execute({
			page,
			snackBarId
		});

		return reply.status(200).send(products);

	} catch (err) {
		if(err instanceof ResourceNotFoundError)
			return reply.status(404).send({ message: err.message});
		throw err;
	}
}