import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeValidateStatusSnackBar } from '@/use-cases/factories/snackBar/make-validate-status-snackBar';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function validateSnackBar(request: FastifyRequest, reply: FastifyReply){
	const validateSchema = z.object({
		snackBarId: z.string()
	});

	const { snackBarId } = validateSchema.parse(request.params);

	try {
		const validate = makeValidateStatusSnackBar();

		const { snackBar } = await validate.execute({
			snackBarId,
		});

		return reply.status(200).send({message: snackBar.status});

	} catch (err) {
		if(err instanceof ResourceNotFoundError)
			return reply.status(404).send({ message: err.message});

		throw err;
	}

}