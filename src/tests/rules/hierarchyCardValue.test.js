import { hierarchyCardValue } from '../../rules/hierarchyCardValue';
describe('hierarchy Card Value', () => {
  it('should reorder the hierarchy correctly for "A"', () => {
    const result = hierarchyCardValue('A');
    expect(result).toEqual(['2', '3', 'A', 'K', 'J', 'Q', '7', '6', '5', '4']);
  });

  it('should reorder the hierarchy correctly for "7"', () => {
    const result = hierarchyCardValue('7');
    expect(result).toEqual(['Q', '3', '2', 'A', 'K', 'J', '7', '6', '5', '4']);
  });

  it('should reorder the hierarchy correctly for "4"', () => {
    const result = hierarchyCardValue('4');
    expect(result).toEqual(['5', '3', '2', 'A', 'K', 'J', 'Q', '7', '6', '4']);
  });

  it('should reorder the hierarchy correctly for "4"', () => {
    const result = hierarchyCardValue('2');
    expect(result).toEqual(['3', '2', 'A', 'K', 'J', 'Q', '7', '6', '5', '4']);
  });
});
