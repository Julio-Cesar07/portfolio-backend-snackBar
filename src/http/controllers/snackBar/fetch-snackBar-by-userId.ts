import { makeFetchSnackBarByUserId } from '@/use-cases/factories/snackBar/make-fetch-snackBar-by-userId';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function fetchSnackBarByUserId(request: FastifyRequest, reply: FastifyReply) {
	const fetchSnackBarSchema = z.object({
		page: z.coerce.number().min(1).default(1)
	});

	const { page } = fetchSnackBarSchema.parse(request.query);
	const fetchSnackBar = makeFetchSnackBarByUserId();

	const { snackBars } = await fetchSnackBar.execute({
		page,
		userId: request.user.sub
	});

	return reply.status(200).send(snackBars);
}