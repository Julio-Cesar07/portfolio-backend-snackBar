export class UserIsntOwnerSnackBarError extends Error{
	constructor(){
		super('User isnt owner of the Snack Bar');
	}
}