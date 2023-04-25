import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndReturnIdSnackBar } from '@/utils/__tests__/create-and-return-id-snackBar';

describe('Validate Snack Bar (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to validate a snack bar', async () => {
		const { access_token, refresh_token, id: user_id } = await createAndAuthenticateUser(app, true);

		const { id: snackBar_id } = await createAndReturnIdSnackBar(app, false, { access_token, refresh_token, user_id, });

		const response = await request(app.server)
			.patch(`/snackBar/${snackBar_id}/validate`)
			.set('Cookie', [`accessToken=${access_token}`, `refreshToken=${refresh_token}`]);

		console.log(response.body);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			message: 'CHECKED'
		});
        
	});
});