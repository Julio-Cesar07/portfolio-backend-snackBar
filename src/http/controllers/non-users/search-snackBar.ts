import { makeFetchQuerySnackBar } from '@/use-cases/factories/snackBar/make-fetch-query-snackbar';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function searchSnackBar(request: FastifyRequest, reply: FastifyReply){
	const fetchQuerySchema = z.object({
		query: z.string(),
		page: z.coerce.number().min(1).default(1)
	});

	const { query, page } = fetchQuerySchema.parse(request.query);


	const fetchQuery = makeFetchQuerySnackBar();

	const { snackBars } = await fetchQuery.execute({
		page,
		query
	});

	return reply.status(200).send({ snackBars,});
}