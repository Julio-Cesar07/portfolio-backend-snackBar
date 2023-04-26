import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Authenticate (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to authenticate', async () => {
		await request(app.server)
			.post('/users')
			.send({
				email: 'johndoe@example.com',
				password: '123456',
				birth: new Date(2000, 0, 1),
				name: 'John Doe'
			});

		const response = await request(app.server)
			.post('/sessions')
			.send({
				email: 'johndoe@example.com',
				password: '123456',
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			access_token: expect.any(String),
			refresh_token: expect.any(String),
		});
	});
});