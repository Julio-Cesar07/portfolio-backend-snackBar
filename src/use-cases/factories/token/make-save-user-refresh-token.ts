import { PrismaUserTokenRepository } from '@/repositories/prisma/prisma-user-token-repository';
import { SaveUserRefreshTokenUseCase } from '@/use-cases/token/save-user-refresh-token';

export function makeSaveUserRefreshToken(){
	const userTokenRepository = new PrismaUserTokenRepository();
	const saveRefreshToken = new SaveUserRefreshTokenUseCase(userTokenRepository);

	return saveRefreshToken;
}