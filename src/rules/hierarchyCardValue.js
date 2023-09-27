export function hierarchyCardValue(turnedCard) {
  const hierarchy = ['3', '2', 'A', 'K', 'J', 'Q', '7', '6', '5', '4'];
  let valueCard = 0;

  const index = hierarchy.indexOf(turnedCard);
  if (index !== -1) {
    if (index === 0) {
      valueCard = hierarchy[9]
      hierarchy.splice(9, 1);
    }
    else {
      valueCard = hierarchy[index - 1]
      hierarchy.splice((index - 1), 1);
    }

    hierarchy.unshift(valueCard)
  }

  return hierarchy
}


