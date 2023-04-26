import { PrismaUserTokenRepository } from '@/repositories/prisma/prisma-user-token-repository';
import { RefreshTokenVerifyUseCase } from '@/use-cases/token/refresh-token';

export function makeRefreshToken(){
	const userTokenRepository = new PrismaUserTokenRepository();
	const refreshToken = new RefreshTokenVerifyUseCase(userTokenRepository);

	return refreshToken;
}