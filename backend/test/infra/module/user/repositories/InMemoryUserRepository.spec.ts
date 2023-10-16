import { HasherSpy } from '@test/mock/mock-cryptography'
import { afterEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@test/repositories/InMemoryUserRepository'
import crypto from 'node:crypto'

let inMemoryRepository: InMemoryUserRepository
let props: any
let hasherSpy: HasherSpy

props = {
	id: crypto.randomUUID(),
	name: 'User',
  email: 'user@gmail.com',
	password: '123',
	nick: 'Xx_TrucoGameplays_xX',
}

describe('InMemoryRepository Repository', () => {
	inMemoryRepository = new InMemoryUserRepository()
	hasherSpy = new HasherSpy()

	afterEach(() => {
		inMemoryRepository.items.length = 0;
	})

	it('Create new Users called repository', async () => {
		inMemoryRepository.create(props);
		expect(inMemoryRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(props)]))
	})
})
