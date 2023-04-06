import { Prisma, SnackBar } from '@prisma/client';

export interface SnackBarRepository{
    create(data: Prisma.SnackBarUncheckedCreateInput): Promise<SnackBar>
    findById(snackBarId: string): Promise<SnackBar | null>
}