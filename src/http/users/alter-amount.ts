import { InsufficientFundsError } from '@/use-cases/errors/insufficient-funds-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeAlterAmountUser } from '@/use-cases/factories/users/make-alter-amount-user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function alterAmount(request: FastifyRequest, reply: FastifyReply){
	const alterAmountSchema = z.object({
		userId: z.string(),
		amount: z.coerce.number()
	});

	const { amount, userId } = alterAmountSchema.parse(request.body);

	try {
		const alterAmount = makeAlterAmountUser();

		const { userAmount } = await alterAmount.execute({
			amount,
			userId,
		});

		return reply.status(200).send({ userAmount });


	} catch (err) {
		if(err instanceof ResourceNotFoundError)
			return reply.status(404).send({ message: err.message });
        
		if(err instanceof InsufficientFundsError)
			return reply.status(406).send({ message: err.message});

		throw err;
	}

}