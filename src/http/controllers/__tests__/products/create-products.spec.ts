import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user';
import { createAndReturnIdSnackBar } from '@/utils/__tests__/create-and-return-id-snackBar';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Create Products (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to create a product', async () => {
		const { id: user_id, access_token } = await createAndAuthenticateUser(app);
		const { id: snackBar_id } = await createAndReturnIdSnackBar(app, true, { user_id, access_token });

		const response = await request(app.server)
			.post('/product')
			.send({
				price: '900',
				snackBar_id,
				title: 'cappuciono'
			})
			.set('Cookie', [`accessToken=${access_token}`]);

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(String)
			})
		);
	});
});