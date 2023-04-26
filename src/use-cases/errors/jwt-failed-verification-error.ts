export class JWTFailedVerificationError extends Error{
	constructor(){
		super('JWT failed verification.');
	}
}