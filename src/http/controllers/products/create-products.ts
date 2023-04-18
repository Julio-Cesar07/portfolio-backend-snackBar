import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { SnackBarNotValidateError } from '@/use-cases/errors/snackBar-not-validate-error';
import { makeCreateProducts } from '@/use-cases/factories/products/make-create-products';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createProducts(request: FastifyRequest, reply: FastifyReply) {
	const createProductsSchema = z.object({
		description: z.string().optional(),
		price: z.coerce.number(),
		snackBar_id: z.string(),
		title: z.string(),
	});

	const { price, snackBar_id, title, description} = createProductsSchema.parse(request.body);

	try {
		const createProducts = makeCreateProducts();

		const { product } = await createProducts.execute({
			price,
			snackBar_id,
			title,
			description,
			userId: request.user.sub
		});

		return reply.status(201).send(product);
	} catch (err) {
		if(err instanceof ResourceNotFoundError)
			return reply.status(404).send({ message: err.message});

		if(err instanceof SnackBarNotValidateError)
			return reply.status(409).send({ message: err.message});

		throw err;
	}   

}