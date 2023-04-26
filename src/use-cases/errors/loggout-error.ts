export class LoggoutError extends Error{
	constructor(){
		super('Error, please login again.');
	}
}