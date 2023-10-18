import { InvalidParamError } from '@/core/errors/InvalidParam'
import { MissingParamError } from '@/core/errors/MissingParam'
import { serverError } from '@/presentation/helpers/HttpHelper'
import { throwError } from '@test/mock/mock-test-helpers'
import { afterEach, describe, expect, it, vitest } from 'vitest'
import crypto from 'node:crypto'
import { CreateMatch } from '@/core/application/useClass/Match/CreateMatch'
import { CreateMatchFactory, CreateMatchRequest } from '@/presentation/controller/match/factories/CreateMatchFactory'
import { makeRequiredMatchValidation } from '@/presentation/controller/match/validator/RequireMatchValidation'
import { InMemoryMatchRepository } from '@test/repositories/InMemoryMatchRepository'

let createMatch: CreateMatch
let inMemoryRepository: InMemoryMatchRepository
let controller: CreateMatchFactory
let data: any

afterEach(() => {
	inMemoryRepository.items.length = 0;
})

describe('Controller Match', () => {
	inMemoryRepository = new InMemoryMatchRepository()
	createMatch = new CreateMatch(inMemoryRepository)
	controller = new CreateMatchFactory(createMatch, makeRequiredMatchValidation())

	const mockRequest = (): CreateMatchRequest.Request => ({
  	data
	})

	it('Create new Matchs called controller', async () => {
		const spyCreate = vitest.spyOn(createMatch, 'execute');
		data = {
			id: crypto.randomUUID(),
			name: 'sala 1',
  		betValue: 50,
  		user: { id: crypto.randomUUID() },
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(201);
	})

	it('should return a serverError response when an error occurs in service', async () => {
    vitest.spyOn(createMatch, 'execute').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
	});

	it('should return a serverError response when an error occurs in repository', async () => {
    vitest.spyOn(inMemoryRepository, 'create').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
	});

	it('Should return an error if someone data not mentioned', async () => {
		const spyCreate = vitest.spyOn(createMatch, 'execute');
		data = {
			id: crypto.randomUUID(),
			name: 'sala 1',
  		betValue: 50,
		}
		const result = await controller.handle(mockRequest());
		expect(spyCreate).toHaveBeenCalledTimes(0);
		expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(new MissingParamError('user'))
	})
})
