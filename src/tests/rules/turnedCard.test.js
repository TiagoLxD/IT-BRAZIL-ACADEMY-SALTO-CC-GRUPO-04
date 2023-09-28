import { turnedCard } from '../../rules/turnedCard';

describe('tests turned Card', () => {
  test('Should return a valid card', () => {
    const result = turnedCard();
    const expectedPattern = /^[A2-7JKQ][\s]+(Ouros|Espadas|Copas|Paus)$/;

    expect(result).toMatch(expectedPattern);
  });

  test('Should generate a different cards', () => {
    const results = new Set();
    const numTests = 12;

    for (let i = 0; i < numTests; i++) {
      const result = turnedCard();
      results.add(result);
    }

    expect(results.size).toBeGreaterThan(1);
  });
})
