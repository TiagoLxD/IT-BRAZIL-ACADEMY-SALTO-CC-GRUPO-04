import { CreateUser } from '@/core/application/useClass/CreateUser'
import { InvalidParamError } from '@/core/errors/InvalidParam'
import { MissingParamError } from '@/core/errors/MissingParam'
import { UniqueParamError } from '@/core/errors/UniqueParam'
import { CreateUserController, CreateUserRequest } from '@/infra/module/User/controller/CreateUserController'
import { PrismaUserRepository } from '@/infra/module/User/repositories/PrismaUserRepository'
import { makeRequiredUserValidation } from '@/presentation/controller/user/validator/RequireUserValidation'
import { makeUserValidation } from '@/presentation/controller/user/validator/UserValidationFactory'
import { serverError } from '@/presentation/helpers/HttpHelper'
import { PrismaClient } from '@prisma/client'
import { HasherSpy } from '@test/mock/mock-cryptography'
import { throwError } from '@test/mock/mock-test-helpers'
import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest'

let createUser: CreateUser
let prismaRepository: PrismaUserRepository
let prisma: PrismaClient
let hasherSpy: HasherSpy
let controller: CreateUserController
let data: any

describe('Controller User', () => {
	prisma = new PrismaClient()
	hasherSpy = new HasherSpy()
	prismaRepository = new PrismaUserRepository(prisma)
	createUser = new CreateUser(prismaRepository, hasherSpy)
	controller = new CreateUserController(createUser, makeRequiredUserValidation(), makeUserValidation())

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

	it('Should return an error if someone data not mentioned', async () => {
		const spyCreate = vitest.spyOn(createUser, 'execute');
		data = {
			name: 'Jean',
			password: '123',
			nick: 'Xx_TrucoGameplays_xX',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(0);
		expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(new MissingParamError('email'))
  })
	it('Should return an error if email is invalid', async () => {
		const spyCreate = vitest.spyOn(createUser, 'execute');
		data = {
			name: 'Jean',
			email: 'jean.souza',
			password: '123',
			nick: 'Xx_TrucoGameplays_xX',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(0);
		expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(new InvalidParamError('email is not in the correct format'))
  })

	it('Create new Users called controller', async () => {
		await prisma.user.deleteMany({})
		const spyCreate = vitest.spyOn(createUser, 'execute');
		data = {
			name: 'Jean',
  		email: 'jean.souza@gmail.com',
			password: '123',
			nick: 'Xx_TrucoGameplays_xX',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(201);
		const isCreateUser = await prisma.user.findMany()
		expect(isCreateUser).toBeDefined();
		expect(isCreateUser[0].password).not.toEqual(data.password);
	})

	it('Return Error is email already exists', async () => {
		await prisma.user.deleteMany({})
		const spyCreate = vitest.spyOn(prismaRepository, 'create');
		data = {
			name: 'Jean',
  		email: 'jean.souza@gmail.com',
			password: '123',
			nick: 'Xx_TrucoGameplays_xX',
		}

		await controller.handle(mockRequest());

		data = {
			name: 'Abner',
  		email: 'jean.souza@gmail.com',
			password: '123',
			nick: 'FavinDoPneu',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(409);
    expect(result.body).toEqual(new UniqueParamError('Email'))
	})

	it('Return Error is nick already exists', async () => {
		await prisma.user.deleteMany({})
		const spyCreate = vitest.spyOn(prismaRepository, 'create');
		data = {
			name: 'Jean',
  		email: 'jean.souza@gmail.com',
			password: '123',
			nick: 'Xx_TrucoGameplays_xX',
		}

		await controller.handle(mockRequest());

		data = {
			name: 'Abner',
  		email: 'abner@gmail.com',
			password: '123',
			nick: 'Xx_TrucoGameplays_xX',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(409);
    expect(result.body).toEqual(new UniqueParamError('Nick'))
	})

	it('should return a serverError response when an error occurs in service', async () => {
		await prisma.user.deleteMany({})
    vitest.spyOn(createUser, 'execute').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
	});

	it('should return a serverError response when an error occurs in repository', async () => {
		await prisma.user.deleteMany({})
    vitest.spyOn(prismaRepository, 'create').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
})
