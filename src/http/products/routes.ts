import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../middlewares/verify-jwt';
import { createProducts } from './create-products';
import { fetchProductsInSnackBar } from './fetch-products-in-snack-bar';

export async function productsRoutes(app: FastifyInstance){
	app.addHook('onRequest', verifyJWT);

	app.post('/product', createProducts);

	app.get('/product/:snackBarId', fetchProductsInSnackBar);
}