import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { buyProducts } from './buy-products';

export async function  buyProductRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.post('/buy', buyProducts);
}