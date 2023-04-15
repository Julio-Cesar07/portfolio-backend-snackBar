import { FastifyInstance } from 'fastify';
import { authenticate } from './authenticate';
import { register } from './register';
import { alterAmount } from './alter-amount';
import { profile } from './profile';
import { loggout } from './loggout';

export async function usersRoutes(app: FastifyInstance){
	app.post('/users', register);
	app.post('/users/amount', alterAmount);
	app.post('/sessions', authenticate);

	app.get('/me', profile);
	app.get('/loggout', loggout);
}