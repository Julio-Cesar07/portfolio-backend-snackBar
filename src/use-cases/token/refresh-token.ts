import { UserTokenRepository } from '@/repositories/interfaces/user-token-repository';
import { LoggoutError } from '../errors/loggout-error';

interface RefreshTokenVerifyUseCaseRequest{
    refresh_token: string | null,
    userId: string,
}

interface RefreshTokenVerifyUseCaseResponse{
    refresh_token_saved: string
}



export class RefreshTokenVerifyUseCase{
	constructor(private userTokenRepository: UserTokenRepository){}

	async execute({
		refresh_token,
		userId
	}: RefreshTokenVerifyUseCaseRequest): Promise<RefreshTokenVerifyUseCaseResponse>{

		if(!refresh_token)
			throw new LoggoutError;

		const refresh_token_saved = await this.userTokenRepository.findByUserId(userId);

		if(!refresh_token_saved)
			throw new LoggoutError;

		if(refresh_token !== refresh_token_saved)
			throw new LoggoutError;   
        
		return {
			refresh_token_saved,
		};
	}
}