export class SnackBarNotValidateError extends Error{
	constructor(){
		super('This Snack Bar has not been validated');
	}
}