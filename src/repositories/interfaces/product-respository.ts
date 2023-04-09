import { Prisma, Product } from '@prisma/client';

export interface ProductRepository {
    create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
    findById(productId: string): Promise<Product | null>
    findAllBySnackBarId(snackBarId: string, page: number): Promise<Product[]>
}