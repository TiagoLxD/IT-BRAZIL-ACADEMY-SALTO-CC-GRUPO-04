import { noContent, serverError } from '@/presentation/helpers/HttpHelper'
import { throwError } from '@test/mock/mock-test-helpers'
import { afterEach, describe, expect, it, vitest } from 'vitest'
import crypto from 'node:crypto'
import { InMemoryMatchRepository } from '@test/repositories/InMemoryMatchRepository'
import { ListMatch } from '@/core/application/useClass/Match/ListMatch'
import { ListMatchFactory } from '@/presentation/controller/match/factories/ListMatchFactory'

let listMatch: ListMatch
let inMemoryRepository: InMemoryMatchRepository
let controller: ListMatchFactory
let data: any

describe('Controller Match', () => {
	inMemoryRepository = new InMemoryMatchRepository()
	listMatch = new ListMatch(inMemoryRepository)
	controller = new ListMatchFactory(listMatch)

	afterEach(() => {
		inMemoryRepository.items.length = 0;
	})

	data = {
		id: crypto.randomUUID(),
		name: 'sala 1',
  	betValue: 50,
		user: {
			id: crypto.randomUUID(),
			name: 'user',
			email: 'user@gmail.com',
			password: '123',
			nick: 'Xx_TrucoGameplays_xX',
		},
	}

	it('Should return no content if not have data', async () => {
		const spyCreate = vitest.spyOn(listMatch, 'execute');
		const result = await controller.handle();
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(204);
    expect(result).toEqual(noContent());
	})

	it('List new Matchs called controller', async () => {
		const spyCreate = vitest.spyOn(listMatch, 'execute');
		for (let i = 0; i < 5; i++) {
      inMemoryRepository.items[i] = { ...data, id: i + 1 };
    }
		const result = await controller.handle();
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(200);
		expect(inMemoryRepository.items).toEqual(result.body);
	})

	it('should return a serverError response when an error occurs in service', async () => {
    vitest.spyOn(listMatch, 'execute').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle();
    expect(httpResponse).toEqual(serverError(new Error()));
	});

	it('should return a serverError response when an error occurs in repository', async () => {
    vitest.spyOn(inMemoryRepository, 'list').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle();
    expect(httpResponse).toEqual(serverError(new Error()));
	});
})
