import { noContent, serverError } from '@/presentation/helpers/HttpHelper'
import { throwError } from '@test/mock/mock-test-helpers'
import { afterEach, describe, expect, it, vitest } from 'vitest'
import crypto from 'node:crypto'
import { InMemoryUserRepository } from '@test/repositories/InMemoryUserRepository'
import { ListUser } from '@/core/application/useClass/User/ListUser'
import { ListUserFactory } from '@/presentation/controller/user/factories/ListUserFactory'

let listUser: ListUser
let inMemoryRepository: InMemoryUserRepository
let controller: ListUserFactory
let data: any

describe('Controller User', () => {
	inMemoryRepository = new InMemoryUserRepository()
	listUser = new ListUser(inMemoryRepository)
	controller = new ListUserFactory(listUser)

	afterEach(() => {
		inMemoryRepository.items.length = 0;
	})

	data = {
		id: crypto.randomUUID(),
		name: 'Jean',
  	email: 'jean.souza@gmail.com',
		password: '123',
		nick: 'X_TrucoGameplays_X',
	}

	it('Should return no content if not have data', async () => {
		const spyCreate = vitest.spyOn(listUser, 'execute');
		const result = await controller.handle();
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(204);
    expect(result).toEqual(noContent());
	})

	it('List new Users called controller', async () => {
		const spyCreate = vitest.spyOn(listUser, 'execute');
		for (let i = 0; i < 5; i++) {
      inMemoryRepository.items[i] = { ...data, id: i + 1 };
    }
		const result = await controller.handle();
		expect(spyCreate).toHaveBeenCalledTimes(1);
		expect(result.statusCode).toEqual(200);
		expect(result.body).toBeDefined();
		expect(result.body.password).toBeUndefined();
	})

	it('should return a serverError response when an error occurs in service', async () => {
    vitest.spyOn(listUser, 'execute').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle();
    expect(httpResponse).toEqual(serverError(new Error()));
	});

	it('should return a serverError response when an error occurs in repository', async () => {
    vitest.spyOn(inMemoryRepository, 'list').mockImplementationOnce(throwError);
    const httpResponse = await controller.handle();
    expect(httpResponse).toEqual(serverError(new Error()));
	});
})
