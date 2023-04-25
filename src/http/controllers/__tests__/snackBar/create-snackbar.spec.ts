import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Create Snack Bar (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to create a snack bar', async () => {
		const { access_token, refresh_token } = await createAndAuthenticateUser(app);

		const response = await request(app.server)
			.post('/snackBar')
			.send({
				addressCity: 'São Carlos',
				addressNumber: '497',
				addressStreet: 'Rua ninguém',
				name: 'Snack',
				description: 'oie, eu sou goku'
			})
			.set('Cookie', [`accessToken=${access_token}`, `refreshToken=${refresh_token}`]);

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			id: expect.any(String)
		});
        
	});
});