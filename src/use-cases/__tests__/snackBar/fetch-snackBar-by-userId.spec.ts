import { InMemorySnackBarRepository } from '@/repositories/in-memory/in-memory-snack-bar-repository';
import { SnackBarRepository } from '@/repositories/interfaces/snack-bar-repository';
import { FetchSnackBarByUserIdUseCase } from '@/use-cases/snackBar/fetch-snackBar-by-userId';
import { describe, beforeEach, it, expect } from 'vitest';

let snackBarRepository: SnackBarRepository;
let sut: FetchSnackBarByUserIdUseCase;

describe('Fetch Snack Bar  by User Id Use Case', () => {
	beforeEach(async () => {
		snackBarRepository = new InMemorySnackBarRepository();
		sut = new FetchSnackBarByUserIdUseCase(snackBarRepository);
	});

	it('should be able to fetch snack bar by user id', async () => {

		const snackBar = await snackBarRepository.create({
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano',
			name: 'Snack Bar Git',
			user_id: 'user-01',
		});

		await snackBarRepository.create({
			addressCity: 'Santos',
			addressNumber: '45698',
			addressStreet: 'Rua de fulano 2',
			name: 'Snack Bar Git 2',
			user_id: 'user-01',
		});

		const { snackBars } = await sut.execute({userId: snackBar.user_id, page: 1});

		expect(snackBars).toHaveLength(2);
	});

	it('should be able paginated a fetch', async () => {

		const snackBarsCreated = []; 

		for(let i = 0; i < 24; i++)
			snackBarsCreated.push(await snackBarRepository.create({
				addressCity: 'Santos',
				addressNumber: '45698',
				addressStreet: 'Rua de fulano',
				name: 'Snack Bar Git',
				user_id: 'user-01',
			}));

		const { snackBars } = await sut.execute({userId: 'user-01', page: 2});

		expect(snackBars).toHaveLength(4);
		expect(snackBars).toEqual([
			expect.objectContaining({ user_id: 'user-01'}),
			expect.objectContaining({ user_id: 'user-01'}),
			expect.objectContaining({ user_id: 'user-01'}),
			expect.objectContaining({ user_id: 'user-01'}),
		]);
	});
});