import { UserTokenRepository } from '@/repositories/interfaces/user-token-repository';

interface SaveUserRefreshTokenUseCaseRequest{
    refresh_token: string,
    userId: string,
}

interface SaveUserRefreshTokenUseCaseResponse{
    refreshToken: string
}



export class SaveUserRefreshTokenUseCase{
	constructor(private userTokenRepository: UserTokenRepository){}

	async execute({
		refresh_token,
		userId
	}: SaveUserRefreshTokenUseCaseRequest): Promise<SaveUserRefreshTokenUseCaseResponse>{
		const refreshToken = await this.userTokenRepository.save(refresh_token, userId);

		return {
			refreshToken
		};
	}
}