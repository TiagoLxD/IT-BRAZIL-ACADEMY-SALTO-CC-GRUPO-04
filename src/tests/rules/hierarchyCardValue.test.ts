import { expect, it, describe } from "vitest";
import { hierarchyCardValue } from "../../rules/hierarchyCardValue";
type CardHierarchy = { [key: string]: string[] };

const cardHierarchy: CardHierarchy = {
	"2": ["3", "2", "A", "K", "J", "Q", "7", "6", "5", "4"],
	"3": ["4", "3", "2", "A", "K", "J", "Q", "7", "6", "5"],
	"4": ["5", "3", "2", "A", "K", "J", "Q", "7", "6", "4"],
	"7": ["Q", "3", "2", "A", "K", "J", "7", "6", "5", "4"],
	"A": ["2", "3", "A", "K", "J", "Q", "7", "6", "5", "4"],
};

describe("hierarchy Card Value", () => {
	it.each(["A", "7", "4", "2", "3"])(
		'should reorder the hierarchy correctly for "%s"',
		(card) => {
			const result = hierarchyCardValue(card);
			expect(result).toEqual(cardHierarchy[card]);
		}
	);
});
