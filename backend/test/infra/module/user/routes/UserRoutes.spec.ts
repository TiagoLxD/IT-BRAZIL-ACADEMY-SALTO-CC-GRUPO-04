import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { afterAll, beforeAll, describe, it } from 'vitest';
import { Express } from 'express';
import { PrismaHelper } from '@/infra/database/prisma/helpers/PrismaHelper';
import { setupApp } from '@/config/app';

let prisma: PrismaClient
let app: Express

describe('User Routes', () => {
	prisma = new PrismaClient()

	beforeAll(async () => {
		PrismaHelper.connect()
		app = await setupApp()
	})

	afterAll(async () => {
		PrismaHelper.disconnect()
	})

	//arrumar o teste do supertest
	describe('POST /signup', () => {
		it('should create a new user', async () => {
			await prisma.user.deleteMany({})
			await request(app)
				.post('/truco/signup')
				.send({
					name: "Jean",
					email: "jean.souza@gmail.com",
					password: "123",
					nick: "Xx_TrucoGameplays_xX"
				}).expect(404);
		});
	});
});
