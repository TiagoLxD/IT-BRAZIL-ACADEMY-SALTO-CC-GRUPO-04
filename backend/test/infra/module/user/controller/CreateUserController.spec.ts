import { CreateUser } from '@/core/application/useClass/CreateUser'
import { CreateUserController, CreateUserRequest } from '@/infra/module/User/controller/CreateUserController'
import { PrismaCreateUser } from '@/infra/module/User/repositories/PrismaCreateUser'
import { serverError } from '@/presentation/helpers/HttpHelper'
import { PrismaClient } from '@prisma/client'
import { throwError } from '@test/mock/test-helpers'
import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest'

let createUser: CreateUser
let prismaRepository: PrismaCreateUser
let prisma: PrismaClient
let controller: CreateUserController
let data: any

describe('Controller User', () => {
	prisma = new PrismaClient()
	prismaRepository = new PrismaCreateUser(prisma)
	createUser = new CreateUser(prismaRepository)
	controller = new CreateUserController(createUser)

	data = {
		name: 'Jean',
  	email: 'jean.souza@gmail.com',
		password: '123',
		nick: 'Xx_TrucoGameplays_xX',
	}

	const mockRequest = (): CreateUserRequest.Request => ({
  	data
	})

	beforeAll(async () => {
		await prisma.$connect()
	})

	afterAll(async () => {
		await prisma.user.deleteMany({})
		await prisma.$disconnect()
  })

	it('Create new Users called controller', async () => {
		await prisma.user.deleteMany({})
		const spyCreate = vitest.spyOn(createUser, 'execute');
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(201);
		expect(await prisma.user.findMany()).toBeDefined();
	})

	it('should return a serverError response when an error occurs in service', async () => {
    vitest.spyOn(createUser, 'execute').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
	});

	it('should return a serverError response when an error occurs in repository', async () => {
    vitest.spyOn(prismaRepository, 'create').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
})
