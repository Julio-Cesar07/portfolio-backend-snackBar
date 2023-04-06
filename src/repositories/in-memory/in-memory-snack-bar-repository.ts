import { Prisma, SnackBar } from '@prisma/client';
import { SnackBarRepository } from '../interfaces/snack-bar-repository';
import { randomUUID } from 'crypto';

export class InMemorySnackBarRepository implements SnackBarRepository{
	public items: SnackBar[] = [];
    
	async create(data: Prisma.SnackBarUncheckedCreateInput): Promise<SnackBar> {
		const snackBar: SnackBar = {
			id: data.id ?? randomUUID(),
			addressCity: data.addressCity,
			addressNumber: data.addressNumber,
			addressStreet: data.addressStreet,
			description: data.description ?? null,
			name: data.name,
			user_id: data.user_id,
			status: data.status ?? 'UNCHECKED'
		};

		this.items.push(snackBar);

		return snackBar;
	}
    
	async findById(snackBarId: string): Promise<SnackBar | null> {
		const snackBar = this.items.find(item => item.id === snackBarId);

		return snackBar ?? null;
	}
}