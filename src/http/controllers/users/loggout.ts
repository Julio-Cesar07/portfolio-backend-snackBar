import { FastifyReply, FastifyRequest } from 'fastify';

export async function loggout(request: FastifyRequest, reply: FastifyReply){
	return reply
		.clearCookie('accessToken', {
			path: '/'
		})
		.status(200)
		.send();

}