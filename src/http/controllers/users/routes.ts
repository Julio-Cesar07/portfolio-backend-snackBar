import { FastifyInstance } from 'fastify';
import { authenticate } from './authenticate';
import { register } from './register';
import { profile } from './profile';
import { loggout } from './loggout';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { refreshToken } from './refresh-token';

export async function usersRoutes(app: FastifyInstance){
	app.post('/users', register);
	app.post('/sessions', authenticate);

	app.patch('/token/refresh', {onRequest: verifyJWT}, refreshToken);

	app.get('/me', {onRequest: verifyJWT}, profile);
	app.get('/loggout', loggout);
}