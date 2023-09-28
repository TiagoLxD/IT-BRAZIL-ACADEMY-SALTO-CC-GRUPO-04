export function turnedCard() {
  let turnedCards = Math.floor(Math.random() * 10) + 1;
  if (turnedCards === 1) {
    turnedCards = 'A'
  }
  else if (turnedCards === 8) {
    turnedCards = 'Q'
  }
  else if (turnedCards === 9) {
    turnedCards = 'J'
  }
  else if (turnedCards === 10) {
    turnedCards = 'K'
  }
  else {
    turnedCards
  }

  const suits = ['Ouros', 'Espadas', 'Copas', 'Paus'];

  const randomSuit = Math.floor(Math.random() * suits.length);

  const sortedSuit = suits[randomSuit];

  return (turnedCards + ' ' + sortedSuit);
}
