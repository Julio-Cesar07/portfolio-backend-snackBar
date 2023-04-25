import { InvalidCredentialErrors } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/users/make-authenticate-use-case';
import { makeSaveUserRefreshToken } from '@/use-cases/factories/token/make-save-user-refresh-token';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	const authenticateSchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const { email, password } = authenticateSchema.parse(request.body);
    
	try {
		const authenticateUseCase = makeAuthenticateUseCase();
		const { user } = await authenticateUseCase.execute({
			email,
			password,
		});

		const accessToken = await reply.jwtSign(
			{
				role: user.role
			},
			{
				sign: {
					sub: user.id,
					expiresIn: '10m'
				}
			}
		);

		const refresh_token = await reply.jwtSign(
			{
				role: user.role
			},
			{
				sign: {
					sub: user.id,
					expiresIn: '7d'
				}
			}
		);

		const saveRefreshToken = makeSaveUserRefreshToken();

		await saveRefreshToken.execute({
			refresh_token,
			userId: user.id,
		});
        
		return reply
			.setCookie('refreshToken', refresh_token, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true
			})
			.setCookie('accessToken', accessToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true
			})
			.status(200)
			.send({access_token: accessToken,});
	} catch (err) {
		if(err instanceof InvalidCredentialErrors)
			return reply.status(400).send({ message: err.message});

		throw err;
	}
}