import { prisma } from '@/lib/prisma';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndReturnIdSnackBar(app: FastifyInstance, isValidate = false, user: {
    user_id: string,
    access_token: string,
    refresh_token: string
}){
	await prisma.snackBar.create({
		data: {
			addressCity: 'Aurora',
			addressNumber: '321',
			addressStreet: 'Rua Boreal',
			name: 'Aurora Snack Bar',
			user_id: user.user_id,
			status: isValidate ? 'CHECKED' : 'UNCHECKED'
		}
	});

	const response = await request(app.server)
		.get('/snackBar')
		.set('Cookie', [`accessToken=${user.access_token}`, `refreshToken=${user.refresh_token}`]);

	return {
		id: response.body[0].id,
	};

}