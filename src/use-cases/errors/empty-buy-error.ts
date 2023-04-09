export class EmptyBuyError extends Error {
	constructor(){
		super('Empty buy.');
	}
}