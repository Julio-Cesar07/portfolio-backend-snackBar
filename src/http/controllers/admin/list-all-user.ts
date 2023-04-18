import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function listAllUser(request: FastifyRequest, reply: FastifyReply){
	const users = await prisma.user.findMany({
		orderBy: {
			created_at: 'asc'
		}
	});

	return reply.status(200).send(users);

}