import { validateSnackBar } from '@/@types/validate-status-snackBar';
import { Prisma, SnackBar } from '@prisma/client';

export interface SnackBarRepository{
    create(data: Prisma.SnackBarUncheckedCreateInput): Promise<SnackBar>
    validateStatus(snackBarId: string, {roleToVerify}: validateSnackBar): Promise<SnackBar | null>
    findById(snackBarId: string): Promise<SnackBar | null>
    findByUserId(userId: string, page: number): Promise<SnackBar[]>
}