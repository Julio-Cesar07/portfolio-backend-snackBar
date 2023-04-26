import { verifyRoleUser } from '@/@types/verify-user-role';
import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyRoleUser({roleToVerify}: verifyRoleUser){
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { role } = request.user;

		if(role !== roleToVerify)
			return reply.status(401).send({ message: 'Unauthorized.'});
	};
}