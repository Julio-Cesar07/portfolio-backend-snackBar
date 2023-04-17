import { Prisma, Product } from '@prisma/client';

export interface ProductRepository {
    create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>
    findById(productId: string): Promise<Product | null>
    findByQuery(query: string, page: number): Promise<Product[]>
    findAllBySnackBarId(snackBarId: string, page: number): Promise<Product[]>
}