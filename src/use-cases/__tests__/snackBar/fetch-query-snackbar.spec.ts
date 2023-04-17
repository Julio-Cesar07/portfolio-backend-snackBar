import { InMemorySnackBarRepository } from '@/repositories/in-memory/in-memory-snack-bar-repository';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { FetchQuerySnackBar } from '@/use-cases/snackBar/fetch-query-snackbar';
import { describe, beforeEach, it, expect } from 'vitest';

let snackBarRepository: SnackBarRepository;
let sut: FetchQuerySnackBar;

describe('Fetch Query Snack Bar Id Use Case', () => {
	beforeEach(async () => {
		snackBarRepository = new InMemorySnackBarRepository();
		sut = new FetchQuerySnackBar(snackBarRepository);

		await snackBarRepository.create({
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git',
			user_id: 'user-01',
		});

		await snackBarRepository.create({
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git 2',
			user_id: 'user-01',
		});

		await snackBarRepository.create({
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar js',
			user_id: 'user-01',
		});

		
	});

	it('should be able to fetch snack bar by name', async () => {
		
		const { snackBars } = await sut.execute({
			page: 1,
			query: 'git'
		});


		expect(snackBars).toHaveLength(2);
	});
});