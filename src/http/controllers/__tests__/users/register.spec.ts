import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register User (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to register', async () => {
		const response = await request(app.server)
			.post('/users')
			.send({
				email: 'johndoe@example.com',
				password: '123456',
				birth: new Date(2000, 0, 1),
				name: 'John Doe'
			});

		expect(response.statusCode).toEqual(201);
	});
});