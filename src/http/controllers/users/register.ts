import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeCreateUser } from '@/use-cases/factories/users/make-create-user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply){
	const createUserSchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		birth: z.coerce.date(),
	});

	const { birth, email, name, password} = createUserSchema.parse(request.body);

	try {
		const createUser = makeCreateUser();

		await createUser.execute({
			birth,
			email,
			name,
			password,
		});

		return reply.status(201).send();
	} catch (err) {
		if(err instanceof UserAlreadyExistsError)
			return reply.status(409).send({ message: err.message});

		throw err;
	}
}