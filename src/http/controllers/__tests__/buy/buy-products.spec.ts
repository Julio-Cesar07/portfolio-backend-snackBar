import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user';
import { createAndReturnIdProduct } from '@/utils/__tests__/create-and-return-id-product';
import { createAndReturnIdSnackBar } from '@/utils/__tests__/create-and-return-id-snackBar';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Buy Products (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to buy a product', async () => {
		const { id: user_id, access_token } = await createAndAuthenticateUser(app, false, 300);
		const { id: snackBar_id } = await createAndReturnIdSnackBar(app, true, { user_id, access_token });

		const products_id = [];

		for(let i = 0; i < 4; i++){
			const { id: product_id } = await createAndReturnIdProduct(app, snackBar_id, 
				{ title: `Cappucino ${i}`, price: i * 10, description: null });
			products_id.push({id: product_id});
		}

        
		const response = await request(app.server)
			.post('/buy')
			.send({
				products: products_id
			})
			.set('Cookie', [`accessToken=${access_token}`]);

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(String)
			})
		);

	});
});