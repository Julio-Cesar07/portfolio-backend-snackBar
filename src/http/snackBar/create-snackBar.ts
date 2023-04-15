import { AgeUnder18Error } from '@/use-cases/errors/age-under-18-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeCreateSnackBar } from '@/use-cases/factories/snackBar/make-create-snackBar';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createSnackBar(request: FastifyRequest, reply: FastifyReply){
	const createSnackBarSchema = z.object({
		name: z.string(),
		description: z.string().optional(),
		addressStreet: z.string(),
		addressNumber: z.string(),
		addressCity: z.string()
	});

	const { addressCity, addressNumber, addressStreet, name, description} = createSnackBarSchema.parse(request.body);

	try {
		const createSnackBar = makeCreateSnackBar();

		const { snackBar } = await createSnackBar.execute({
			addressCity,
			addressNumber,
			addressStreet,
			name,
			description,
			user_id: request.user.sub,
		});

		return reply.status(201).send({ id: snackBar.id});

	} catch (err) {
		if(err instanceof ResourceNotFoundError)
			return reply.status(404).send({ message: err.message});
	
		if(err instanceof AgeUnder18Error)
			return reply.status(406).send({ message: err.message});

		throw err;
	}

}