import { Prisma, SnackBar } from '@prisma/client';
import { SnackBarRepository, validateSnackBar } from '../interfaces/snack-bar-repository';
import { prisma } from '@/lib/prisma';
import { numberPagesPagination } from '@/utils/number-pages-pagination';

export class PrismaSnackBarRepository implements SnackBarRepository{
	async create(data: Prisma.SnackBarUncheckedCreateInput): Promise<SnackBar> {
		const snackBar = await prisma.snackBar.create({
			data,
		});

		return snackBar;
	}
	async findById(snackBarId: string): Promise<SnackBar | null> {
		const snackBar = await prisma.snackBar.findFirst({
			where: {
				id: snackBarId
			}
		});

		return snackBar;
	}

	async findByUserId(userId: string, page: number): Promise<SnackBar[]> {
		const snackBars = await prisma.snackBar.findMany({
			where: {
				user_id: userId,
			},
			take: numberPagesPagination,
			skip: numberPagesPagination * (page -1),
			orderBy: {
				status: 'asc',
			}
		});

		return snackBars;
	}

	async validateStatus(snackBarId: string, validate: validateSnackBar): Promise<SnackBar | null> {
		const snackBar = await prisma.snackBar.update({
			where: {
				id: snackBarId
			},
			data: {
				status: validate.validate,
			}
		});

		return snackBar;
	}
}