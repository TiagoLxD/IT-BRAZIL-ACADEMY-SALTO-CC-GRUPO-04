import { getRandomNumberInRange } from "../utils/utils";

const suits = ["Ouros", "Espadas", "Copas", "Paus"];

export const turnedCard = () => {
	let turnedCards: number | string = Math.floor(Math.random() * 10) + 1;
	turnedCards = turnCard(turnedCards);

	const randomSuit = getRandomNumberInRange(suits.length);
	const sortedSuit = suits[randomSuit];

	return `${turnedCards} ${sortedSuit}`;
};

function turnCard(turnedCards: number): string {
	const cardMap: { [key: number]: string } = {
		1: "A",
		8: "Q",
		9: "J",
		10: "K",
	};

	return cardMap[turnedCards] || turnedCards.toString();
}
