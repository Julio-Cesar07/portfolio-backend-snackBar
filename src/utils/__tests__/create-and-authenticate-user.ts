import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false){
	const { id } = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
			birth: new Date(2000, 0, 1),
			role: isAdmin ? 'ADMIN' : 'MEMBER'
		}
	});

	const authResponse = await request(app.server)
		.post('/sessions')
		.send({
			email: 'johndoe@example.com',
			password: '123456'
		});

	const { access_token } = authResponse.body;   

	const cookies = authResponse.header['set-cookie'];
	let refresh_token = null;

	for(let i = 0; i < cookies.length; i++){
		if(cookies[i].includes('refreshToken'))
			refresh_token = cookies[i].split('refreshToken=')[1].split(';')[0];
	}

	return {
		access_token,
		refresh_token,
		id
	};

}