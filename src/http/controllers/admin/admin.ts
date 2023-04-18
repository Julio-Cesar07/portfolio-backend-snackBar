import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function createAdmin(request: FastifyRequest, reply: FastifyReply){
	const userAdmin:User = {
		id: randomUUID(),
		amount: new Prisma.Decimal(0),
		birth: new Date(2000, 0, 1),
		email: 'admin@admin.com',
		name: 'admin',
		password_hash: await hash('admin', 6),
		role: 'ADMIN',
		created_at: new Date()
	};

	const admin = await prisma.user.create({
		data: userAdmin
	});

	return reply.status(200).send(admin.id);

}