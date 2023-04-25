import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetUserProfile } from '@/use-cases/factories/users/make-get-user-profile';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply){
	try {
		const getUserProfile = makeGetUserProfile();

		const { user } = await getUserProfile.execute({
			userId: request.user.sub,
		});

		return reply.status(200).send({
			user: {
				...user,
				password_hash: undefined
			},
				
		});
	} catch (err) {
		if(err instanceof ResourceNotFoundError)
			return reply.status(404).send({ message: err.message });

		throw err;
	}
}