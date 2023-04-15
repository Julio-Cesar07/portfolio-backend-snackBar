import { InMemorySnackBarRepository } from '@/repositories/in-memory/in-memory-snack-bar-repository';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { ValidateStatusSnackBarUseCase } from '@/use-cases/snackBar/validate-status-snack-bar';
import { describe, beforeEach, it, expect } from 'vitest';

let snackBarRepository: SnackBarRepository;
let sut: ValidateStatusSnackBarUseCase;

describe('Create a Snack Bar Use Case', () => {
	beforeEach(async () => {
		snackBarRepository = new InMemorySnackBarRepository();
		sut = new ValidateStatusSnackBarUseCase(snackBarRepository);

		await snackBarRepository.create({
			id: 'snackBar-01',
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git',
			user_id: 'user-01',
		});
	});

	it('should be able to validade a snack bar', async () => {
		const { snackBar } = await sut.execute({
			snackBarId: 'snackBar-01'
		});

		expect(snackBar.status).toEqual('CHECKED');
	});

	it('should not be able to validade a snack bar if not exists', async () => {
		await expect(() => 
			sut.execute({
				snackBarId: 'snackBar-02'
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});