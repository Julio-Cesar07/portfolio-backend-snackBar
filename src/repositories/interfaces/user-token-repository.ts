
export interface UserTokenRepository {
   save(refreshToken: string, userId: string): Promise<string>
   findByUserId(userId: string): Promise<string | null>
}