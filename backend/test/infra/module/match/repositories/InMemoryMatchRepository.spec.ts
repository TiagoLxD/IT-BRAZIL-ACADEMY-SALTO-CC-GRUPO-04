import { HasherSpy } from '@test/mock/mock-cryptography'
import { afterEach, describe, expect, it } from 'vitest'
import crypto from 'node:crypto'
import { InMemoryMatchRepository } from '@test/repositories/InMemoryMatchRepository'

let inMemoryRepository: InMemoryMatchRepository
let props: any

props = {
	id: crypto.randomUUID(),
	name: 'sala 1',
  betValue: 50,
  user: { id: crypto.randomUUID() },
}

describe('InMemoryRepository Repository Match', () => {
	inMemoryRepository = new InMemoryMatchRepository()

	afterEach(() => {
		inMemoryRepository.items.length = 0;
	})

	it('Create new Users called repository', async () => {
		inMemoryRepository.create(props);
		expect(inMemoryRepository.items).toEqual(expect.arrayContaining([expect.objectContaining(props)]))
	})
})
