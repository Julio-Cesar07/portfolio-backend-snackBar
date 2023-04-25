import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user';

describe('Profile (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to get profile', async () => {
		const { access_token } = await createAndAuthenticateUser(app);

		const profileResponse = await request(app.server)
			.get('/me')
			.set('Authorization', `Bearer ${access_token}`);

		expect(profileResponse.statusCode).toEqual(200);
		expect(profileResponse.body.user).toEqual(expect.objectContaining({
			email: 'johndoe@example.com',
		}));
	});
});