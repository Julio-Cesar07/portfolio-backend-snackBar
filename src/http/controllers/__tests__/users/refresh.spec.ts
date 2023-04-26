import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Refresh Token (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to refresh token', async () => {
		const { access_token, refresh_token } = await createAndAuthenticateUser(app);

		const response = await request(app.server)
			.patch('/token/refresh')
			.send({
				refresh_token,
			})
			.set('Cookie', [`accessToken=${access_token}`]);

		expect(response.statusCode).toEqual(200);
		expect(response.get('Set-Cookie')).toEqual([
			expect.stringContaining('accessToken='),
		]);
	});
});