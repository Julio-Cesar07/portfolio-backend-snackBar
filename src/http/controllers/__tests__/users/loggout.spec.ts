import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/__tests__/create-and-authenticate-user';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

describe('Loggout (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to loggout', async () => {
		await createAndAuthenticateUser(app);
        
		const response = await request(app.server)
			.get('/loggout');
        
		expect(response.get('Set-Cookie')).toEqual([
			expect.stringContaining('accessToken=;'),
		]);
	});
});