import { refreshTokenMiddleware } from '@/http/middlewares/refresh-token-middleware';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function refreshToken(request: FastifyRequest, reply: FastifyReply){

	const refreshTokenSchema = z.object({
		refresh_token: z.string()
	});

	const { refresh_token: refreshTokenOld } = refreshTokenSchema.parse(request.body);

	const { access_token, refresh_token} = await refreshTokenMiddleware(request, reply, refreshTokenOld);

	return reply
		.setCookie('accessToken', access_token, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		}).status(200).send({ access_token, refresh_token});
}