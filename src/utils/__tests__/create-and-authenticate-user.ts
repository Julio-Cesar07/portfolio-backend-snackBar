import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false, amount = 0){
	const { id } = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
			birth: new Date(2000, 0, 1),
			role: isAdmin ? 'ADMIN' : 'MEMBER',
			amount: amount
		}
	});

	const authResponse = await request(app.server)
		.post('/sessions')
		.send({
			email: 'johndoe@example.com',
			password: '123456'
		});

	const { access_token, refresh_token } = authResponse.body;   

	return {
		access_token,
		refresh_token,
		id
	};

}