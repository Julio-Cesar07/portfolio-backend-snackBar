export class AgeUnder18Error extends Error {
	constructor(){
		super('User is under 18 years old.');
	}
}