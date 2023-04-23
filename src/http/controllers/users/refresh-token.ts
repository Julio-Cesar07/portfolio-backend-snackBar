import { refreshTokenMiddleware } from '@/http/middlewares/refresh-token-middleware';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function refreshToken(request: FastifyRequest, reply: FastifyReply){
	const { accessToken, refresh_token} = await refreshTokenMiddleware(request, reply);

	return reply
		.setCookie('refreshToken', refresh_token, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.setCookie('accessToken', accessToken, {
			path: '/',
			secure: true,
			sameSite: true,
			httpOnly: true,
		}).status(200).send({ accessToken});
}