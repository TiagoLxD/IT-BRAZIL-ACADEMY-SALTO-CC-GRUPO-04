import { CreateUser } from '@/core/application/useClass/User/CreateUser'
import { InvalidParamError } from '@/core/errors/InvalidParam'
import { MissingParamError } from '@/core/errors/MissingParam'
import { UniqueParamError } from '@/core/errors/UniqueParam'
import { CreateUserFactory, CreateUserRequest } from '@/presentation/controller/user/factories/CreateUserFactory'
import { makeRequiredUserValidation } from '@/presentation/controller/user/validator/RequireUserValidation'
import { makeUserValidation } from '@/presentation/controller/user/validator/UserValidationFactory'
import { serverError } from '@/presentation/helpers/HttpHelper'
import { HasherSpy } from '@test/mock/mock-cryptography'
import { throwError } from '@test/mock/mock-test-helpers'
import { afterEach, describe, expect, it, vitest } from 'vitest'
import crypto from 'node:crypto'
import { InMemoryUserRepository } from '@test/repositories/InMemoryUserRepository'

let createUser: CreateUser
let inMemoryRepository: InMemoryUserRepository
let hasherSpy: HasherSpy
let controller: CreateUserFactory
let data: any

afterEach(() => {
	inMemoryRepository.items.length = 0;
})

describe('Controller User', () => {
	hasherSpy = new HasherSpy()
	inMemoryRepository = new InMemoryUserRepository()
	createUser = new CreateUser(inMemoryRepository, hasherSpy)
	controller = new CreateUserFactory(createUser, makeRequiredUserValidation(), makeUserValidation())

	const mockRequest = (): CreateUserRequest.Request => ({
  	data
	})

	it('Return Error is email already exists', async () => {
		const spyCreate = vitest.spyOn(inMemoryRepository, 'create');
		data = {
			id: crypto.randomUUID(),
			name: 'Jean',
  		email: 'jean.souza@gmail.com',
			password: '123',
			nick: 'X_TrucoGameplays_X',
		}

		await controller.handle(mockRequest());

		data = {
			id: crypto.randomUUID(),
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

	it('should return a serverError response when an error occurs in service', async () => {
    vitest.spyOn(createUser, 'execute').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
	});

	it('should return a serverError response when an error occurs in repository', async () => {
    vitest.spyOn(inMemoryRepository, 'create').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

	it('Should return an error if someone data not mentioned', async () => {
		const spyCreate = vitest.spyOn(createUser, 'execute');
		data = {
			id: crypto.randomUUID(),
			name: 'Jean',
			password: '123',
			nick: 'X_TrucoGameplays_X',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(0);
		expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(new MissingParamError('email'))
	})

	it('Should return an error if email is invalid', async () => {
		const spyCreate = vitest.spyOn(createUser, 'execute');
		data = {
			id: crypto.randomUUID(),
			name: 'Jean',
			email: 'jean.souza',
			password: '123',
			nick: 'X_TrucoGameplays_X',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(0);
		expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(new InvalidParamError('email is not in the correct format'))
  })

	it('Return Error is nick already exists', async () => {
		const spyCreate = vitest.spyOn(inMemoryRepository, 'create');
		data = {
			id: crypto.randomUUID(),
			name: 'Jean',
  		email: 'jean.souza@gmail.com',
			password: '123',
			nick: 'X_TrucoGameplays_X',
		}

		await controller.handle(mockRequest());

		data = {
			id: crypto.randomUUID(),
			name: 'Abner',
  		email: 'abner@gmail.com',
			password: '123',
			nick: 'X_TrucoGameplays_X',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(409);
    expect(result.body).toEqual(new UniqueParamError('Nick'))
	})

	it('Create new Users called controller', async () => {
		const spyCreate = vitest.spyOn(createUser, 'execute');
		data = {
			id: crypto.randomUUID(),
			name: 'Jean',
  		email: 'jean.souza@gmail.com',
			password: '123',
			nick: 'X_TrucoGameplays_X',
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(data.password).not.toEqual(inMemoryRepository.items[0].password);
		expect(result.statusCode).toEqual(201);
	})
})
