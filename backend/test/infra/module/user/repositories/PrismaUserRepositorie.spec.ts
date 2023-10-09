import { CreateUser } from '@/core/application/useClass/CreateUser'
import { PrismaCreateUser } from '@/infra/module/User/repositories/PrismaCreateUser'
import { PrismaClient } from '@prisma/client'
import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest'

let createUser: CreateUser
let prismaRepository: PrismaCreateUser
let prisma: PrismaClient
let props: any

props = {
	name: 'Jean',
  email: 'jean.souza@gmail.com',
	password: '123',
	nick: 'Xx_TrucoGameplays_xX',
}

describe('Prisma Repository', () => {
	prisma = new PrismaClient()
	prismaRepository = new PrismaCreateUser(prisma)
	createUser = new CreateUser(prismaRepository)

	beforeAll(async () => {
		await prisma.$connect()
	})

	afterAll(async () => {
		await prisma.user.deleteMany({})
		await prisma.$disconnect()
  })

	it('Create new Users called service', async () => {
		await prisma.user.deleteMany({})
		const spyCreate = vitest.spyOn(createUser, 'execute');
		await createUser.execute(props);
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(await prisma.user.findMany()).toBeDefined();
	})

	it('Create new Users called repository', async () => {
		await prisma.user.deleteMany({})
		const spyRepository = vitest.spyOn(prismaRepository, 'create');
		expect(prisma).toBeDefined()
		expect(prismaRepository).toBeDefined()
		expect(createUser).toBeDefined()
		await prismaRepository.create(props);
		expect(spyRepository).toHaveBeenCalledTimes(1);
		expect(await prisma.user.findMany()).toBeDefined();
  })
})
