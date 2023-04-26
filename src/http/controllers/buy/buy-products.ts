import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeBuyProducts } from '@/use-cases/factories/buy/make-buy-products';
import { EmptyBuyError } from '@/use-cases/errors/empty-buy-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { DifferentSnackBarError } from '@/use-cases/errors/different-snackBar-error';
import { ProductDoesntExistError } from '@/use-cases/errors/product-doesnt-exist-error';
import { InsufficientFundsError } from '@/use-cases/errors/insufficient-funds-error';

export async function buyProducts(request: FastifyRequest, reply: FastifyReply){  
	const buyProductsSchema = z.object({
		products: z.array(
			z.object({
				id: z.string(),
			})
		)
	});

	const { products } = buyProductsSchema.parse(request.body);

	try {
		const buyProducts = makeBuyProducts();

		const { buy } = await buyProducts.execute({
			userId: request.user.sub,
			products,
		});

		return reply.status(200).send(buy);
	} catch (err) {
		if(err instanceof EmptyBuyError)
			return reply.status(406).send({ message: err.message});
		if(err instanceof ResourceNotFoundError)
			return reply.status(406).send({ message: err.message});
		if(err instanceof DifferentSnackBarError)
			return reply.status(406).send({ message: err.message});
		if(err instanceof ProductDoesntExistError)
			return reply.status(406).send({ message: err.message});
		if(err instanceof InsufficientFundsError)
			return reply.status(406).send({ message: err.message});
		throw err;
	}
}