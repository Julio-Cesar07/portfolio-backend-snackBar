export class ProductDoesntExistError extends Error {
	constructor(){
		super('Product doesnt exist.');
	}
}