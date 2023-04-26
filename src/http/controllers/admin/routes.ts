import { FastifyInstance } from 'fastify';
import { createAdmin } from './admin';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyRoleUser } from '../../middlewares/verify-role-user';
import { alterAmount } from './alter-amount';
import { listAllUser } from './list-all-user';

export async function adminRoutes(app:FastifyInstance){
	app.get('/admin', createAdmin);
	app.post('/users/amount', {onRequest: [ verifyJWT, verifyRoleUser({roleToVerify: 'ADMIN'})]}, alterAmount);

	app.get('/users/list', {onRequest: [verifyJWT, verifyRoleUser({roleToVerify: 'ADMIN'})]}, listAllUser);
}