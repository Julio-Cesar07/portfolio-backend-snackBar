import { Buy, Prisma } from '@prisma/client';

export interface BuyProductsRepository {
    buyProducts(data: Prisma.BuyUncheckedCreateInput, products: {id: string}[]): Promise<Buy>
    historyBuyUser(userId: string, page: number): Promise<Buy[]>
}