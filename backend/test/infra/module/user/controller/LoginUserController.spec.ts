import { LoginUser } from '@/core/application/useClass/LoginUser'
import { InvalidParamError } from '@/core/errors/InvalidParam'
import { MissingParamError } from '@/core/errors/MissingParam'
import { UnauthorizedError } from '@/core/errors/UnauthorizedError'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { LoginUserController, LoginUserRequest } from '@/infra/module/User/controller/LoginUserController'
import { PrismaUserRepository } from '@/infra/module/User/repositories/PrismaUserRepository'
import { makeRequiredLoginValidation } from '@/presentation/controller/user/validator/RequireLoginValidation'
import { makeUserValidation } from '@/presentation/controller/user/validator/UserValidationFactory'
import { serverError } from '@/presentation/helpers/HttpHelper'
import { PrismaClient } from '@prisma/client'
import { HashComparerSpy } from '@test/mock/mock-cryptography'
import { throwError } from '@test/mock/mock-test-helpers'
import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest'

let loginUser: LoginUser
let prismaRepository: PrismaUserRepository
let prisma: PrismaClient
let hasherSpy: HashComparerSpy
let controller: LoginUserController
let login: any
let data: any

describe('Controller Login', () => {
	prisma = new PrismaClient()
	hasherSpy = new HashComparerSpy()
	prismaRepository = new PrismaUserRepository(prisma)
	loginUser = new LoginUser(prismaRepository, hasherSpy)
	controller = new LoginUserController(loginUser, makeRequiredLoginValidation(), makeUserValidation())
	data = {
		name: 'Jean',
  	email: 'jean.souza@gmail.com',
		password: '123',
		nick: 'Xx_TrucoGameplays_xX',
	}

	const mockRequest = (): LoginUserRequest.Request => ({
  	login
	})


	beforeAll(async () => {
		await prisma.$connect()
		await prismaRepository.create(data);
	})

	afterAll(async () => {
		await prisma.user.deleteMany({})
		await prisma.$disconnect()
	})

	it('Should return an error if someone data not mentioned', async () => {
		const spylogin = vitest.spyOn(loginUser, 'execute');
		login = {
			email: 'abner@gmail.com',
		}
		const result = await controller.handle(mockRequest());
		expect(spylogin).toHaveBeenCalledTimes(0);
		expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(new MissingParamError('password'))
  })
	it('Should return an error if email is invalid', async () => {
		const spylogin = vitest.spyOn(loginUser, 'execute');
		login = {
			email: 'jean.souza',
			password: '123',
		}
		const result = await controller.handle(mockRequest());
		expect(spylogin).toHaveBeenCalledTimes(0);
		expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(new InvalidParamError('email is not in the correct format'))
  })

	/*
	it('login must be have a success', async () => {
		const spylogin = vitest.spyOn(loginUser, 'execute');
		data = {
  		email: 'jean.souza@gmail.com',
			password: '123',
		}
		const result = await controller.handle(mockRequest());
		expect(spylogin).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(200);
	})
*/
	it('login unauthorized', async () => {
		const spylogin = vitest.spyOn(loginUser, 'execute');
		login = {
  		email: 'jean.souza@gmail.com',
			password: '1234',
		}
		hasherSpy.isValid = false
		const result = await controller.handle(mockRequest());
		expect(spylogin).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(401);
		expect(result.body).toEqual(new UnauthorizedError('Email or password not found'))
	})

	it('should return a serverError response when an error occurs in service', async () => {
    vitest.spyOn(loginUser, 'execute').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
	});

	it('should return a serverError response when an error occurs in repository', async () => {
    vitest.spyOn(prismaRepository, 'findByEmail').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
})
