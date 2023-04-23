import { FastifyReply, FastifyRequest } from 'fastify';
import { refreshTokenMiddleware } from './refresh-token-middleware';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply){
	try {
		await request.jwtVerify();
		console.log('passamo direto');
	} catch (err) {
		console.log('bora gerar um novo token');
		const { accessToken, refresh_token } = await refreshTokenMiddleware(request, reply);
		reply
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
			});
	}
}