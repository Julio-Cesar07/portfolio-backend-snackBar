import { FastifyInstance } from 'fastify';
import { createSnackBar } from './create-snackBar';
import { validateSnackBar } from './validate-snack-bar';
import { fetchSnackBarByUserId } from './fetch-snackBar-by-userId';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyRoleUser } from '../../middlewares/verify-role-user';

export async function snackBarRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT);

	app.post('/snackBar', createSnackBar);
	app.patch('/snackBar/:snackBarId/validate', {onRequest: verifyRoleUser({roleToVerify: 'ADMIN'})},validateSnackBar);

	app.get('/snackBar', fetchSnackBarByUserId);

}