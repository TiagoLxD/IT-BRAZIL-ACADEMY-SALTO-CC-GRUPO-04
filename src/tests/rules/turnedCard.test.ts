import { expect, it, describe } from "vitest";
import { turnedCard } from '../../rules/turnedCard';

//Professor: tenho a impressão que testes de componentes menores podem ser validados aqui. O que vc.s recomendam?

describe('tests turned Card', () => {
	it('Should return a valid card', () => {
		const result = turnedCard()
		const expectedPattern = /^[A2-7JKQ][\s]+(Ouros|Espadas|Copas|Paus)$/;

		expect(result).toMatch(expectedPattern);
	});

	it('Should generate a different cards', () => {
		const results = new Set()
		const numTests = 12;

		for (let i = 0; i < numTests; i++) {
			const result = turnedCard();
			results.add(result);
		}

		expect(results.size).toBeGreaterThan(1);
	});
})
