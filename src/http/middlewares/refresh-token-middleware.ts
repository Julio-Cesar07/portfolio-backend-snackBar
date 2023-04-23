import { app } from '@/app';
import { LoggoutError } from '@/use-cases/errors/loggout-error';
import { makeRefreshToken } from '@/use-cases/factories/token/make-refresh-token';
import { makeSaveUserRefreshToken } from '@/use-cases/factories/token/make-save-user-refresh-token';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function refreshTokenMiddleware(request: FastifyRequest, reply: FastifyReply){
	try {
		await request.jwtVerify({ onlyCookie: true, ignoreExpiration: true,});
	
		const { role } = request.user;
		const refreshTokenUseCase = makeRefreshToken();
		
		const { refresh_token_saved } = await refreshTokenUseCase.execute({
			refresh_token: request.cookies['refreshToken'] ?? null,
			userId: request.user.sub
		});

		app.jwt.verify(refresh_token_saved);
		
		const accessToken = await reply.jwtSign(
			{ role },
			{
				sign: {
					sub: request.user.sub,	
					expiresIn: '10m'		
				}
			}
		);
	
		const refresh_token = await reply.jwtSign(
			{ role, },
			{
				sign: {
					sub: request.user.sub,
					expiresIn: '7d',
				},
			}
		);
	
		const saveRefreshToken = makeSaveUserRefreshToken();
	
		await saveRefreshToken.execute({
			refresh_token,
			userId: request.user.sub
		});
	
		return {
			accessToken, 
			refresh_token
		};


	} catch (err) {
		if(err instanceof LoggoutError)
			return reply.status(401).send({message: err.message});
		
		throw err;
	}
}