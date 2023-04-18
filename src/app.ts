import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { usersRoutes } from './http/controllers/users/routes';
import { snackBarRoutes } from './http/controllers/snackBar/routes';
import { productsRoutes } from './http/controllers/products/routes';
import { adminRoutes } from './http/controllers/admin/routes';
import { buyProductRoutes } from './http/controllers/buy/routes';
import { nonUsersRoutes } from './http/controllers/non-users/routes';

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false
	},
	sign: {
		expiresIn: '10m'
	}
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(snackBarRoutes);
app.register(productsRoutes);
app.register(buyProductRoutes);
app.register(nonUsersRoutes);

if(env.NODE_ENV === 'dev')
	app.register(adminRoutes); // create user admin

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError){
		return reply.status(400).send({ message: 'Validation error', issues: error.format()});
	}

	if(env.NODE_ENV !== 'production')
		console.error(error);
	else{
		//  
	}
    
	return reply.status(500).send({ message: 'Internal Server Error.', issues: error});
});