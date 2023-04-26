import { UserTokenRepository } from '../interfaces/user-token-repository';
import { prisma } from '@/lib/prisma';

export class PrismaUserTokenRepository implements UserTokenRepository{
	async save(refreshToken: string, userId: string): Promise<string> {
		const refreshTokenInstance = await prisma.userRefreshToken.upsert({
			where: {
				user_id: userId
			},
			create: {
				refresh_token: refreshToken,
				user_id: userId,
			},
			update: {
				refresh_token: refreshToken
			}
		});

		return refreshTokenInstance.refresh_token;
	}

	async findByUserId(userId: string): Promise<string | null> {
		const refresh_token_instance = await prisma.userRefreshToken.findFirst({
			where: {
				user_id: userId
			}
		});

		return refresh_token_instance ? refresh_token_instance.refresh_token : null;
	}
    
}