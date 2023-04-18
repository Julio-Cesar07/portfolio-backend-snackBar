import { FastifyInstance } from 'fastify';
import { searchProducts } from './search-products';
import { searchSnackBar } from './search-snackBar';

export async function nonUsersRoutes(app: FastifyInstance){
	app.get('/product/search', searchProducts);
	app.get('/snackBar/search', searchSnackBar);
}