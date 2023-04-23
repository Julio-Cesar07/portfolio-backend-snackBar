import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetUserProfile } from '@/use-cases/factories/users/make-get-user-profile';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function profile(request: FastifyRequest, reply: FastifyReply){
	const getUserProfileSchema = z.object({
		userId: z.string(),
	});

	const { userId } = getUserProfileSchema.parse(request.body);

	try {
		const getUserProfile = makeGetUserProfile();

		const { user } = await getUserProfile.execute({
			userId,
		});

		return reply.status(200).send({
			...user,
			password_hash: undefined
		});
	} catch (err) {
		if(err instanceof ResourceNotFoundError)
			return reply.status(404).send({ message: err.message });

		throw err;
	}
}