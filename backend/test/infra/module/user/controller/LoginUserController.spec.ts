import { LoginUser } from '@/core/application/useClass/User/LoginUser'
import { InvalidParamError } from '@/core/errors/InvalidParam'
import { MissingParamError } from '@/core/errors/MissingParam'
import { UnauthorizedError } from '@/core/errors/UnauthorizedError'
import { LoginUserFactory, LoginUserRequest } from '@/presentation/controller/user/factories/LoginFactory'
import { makeRequiredLoginValidation } from '@/presentation/controller/user/validator/RequireLoginValidation'
import { makeUserValidation } from '@/presentation/controller/user/validator/UserValidationFactory'
import { serverError } from '@/presentation/helpers/HttpHelper'
import { PrismaClient, User } from '@prisma/client'
import { HashComparerSpy } from '@test/mock/mock-cryptography'
import { throwError } from '@test/mock/mock-test-helpers'
import crypto from 'node:crypto'
import { afterEach, describe, expect, it, vitest } from 'vitest'
import { InMemoryUserRepository } from '@test/repositories/InMemoryUserRepository'

let loginUser: LoginUser
let inMemoryRepository: InMemoryUserRepository
let hasherSpy: HashComparerSpy
let controller: LoginUserFactory
let login: any
let data: any

describe('Controller Login', () => {
	hasherSpy = new HashComparerSpy()
	inMemoryRepository = new InMemoryUserRepository()
	loginUser = new LoginUser(inMemoryRepository, hasherSpy)
	controller = new LoginUserFactory(loginUser, makeRequiredLoginValidation(), makeUserValidation())

	const mockRequest = (): LoginUserRequest.Request => ({
  	login
	})

		data = {
			id: crypto.randomUUID(),
			name: 'Jean',
  		email: 'jean.souza@gmail.com',
			password: '123',
			nick: 'X_TrucoGameplays_X',
		}

	afterEach(() => {
		inMemoryRepository.items.length = 0;
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

	it('login must be have a success', async () => {
		const spylogin = vitest.spyOn(loginUser, 'execute');
		inMemoryRepository.items.push({ ...data });
		login = {
  		email: 'jean.souza@gmail.com',
			password: 'ff546cc8-6869-11ee-8c99-0242ac120002',
		}
		const result = await controller.handle(mockRequest());
		hasherSpy.isValid = true
		expect(spylogin).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(200);
	})

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
    vitest.spyOn(inMemoryRepository, 'findByEmail').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
})
