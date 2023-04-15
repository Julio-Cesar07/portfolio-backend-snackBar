import { FastifyInstance } from 'fastify';
import { createAdmin } from './admin';

export async function adminRoutes(app:FastifyInstance){
	app.get('/admin', createAdmin);
}