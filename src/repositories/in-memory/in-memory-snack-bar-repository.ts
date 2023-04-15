import { Prisma, SnackBar } from '@prisma/client';
import { SnackBarRepository } from '../interfaces/snack-bar-repository';
import { randomUUID } from 'crypto';
import { numberPagesPagination } from '@/utils/number-pages-pagination';
import { validateSnackBar } from '@/@types/validate-status-snackBar';

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
			created_at: data.created_at ? new Date(data.created_at) : new Date(),
			status: data.status ?? 'UNCHECKED'
		};

		this.items.push(snackBar);

		return snackBar;
	}
    
	async findById(snackBarId: string): Promise<SnackBar | null> {
		const snackBar = this.items.find(item => item.id === snackBarId);

		return snackBar ?? null;
	}

	async findByUserId(userId: string, page: number): Promise<SnackBar[]> {
		const snackBars = 
			this.items.filter(item => item.user_id === userId)
				.slice((page - 1) * numberPagesPagination, numberPagesPagination * page);

		return snackBars;
	}

	async validateStatus(snackBarId: string, {roleToVerify}: validateSnackBar): Promise<SnackBar | null> {
		const snackBar = this.items.find(item => {
			if(item.id === snackBarId){
				item.status = roleToVerify;
				return item;
			}		
		});

		return snackBar ?? null;
	}
}