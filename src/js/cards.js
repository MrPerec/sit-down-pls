'use strict';

document.addEventListener(`DOMContentLoaded`, async () => {
  const { pathname } = document.location;

  if (pathname === `/index.html` || pathname === `/` || pathname === `/product.html`) {
    const cardsContainerElem = document.querySelector(`.js-cards`);
    const cardListData = await fetchCardList(`./json/cardsData.json`);

    cardsContainerElem.insertAdjacentHTML(`beforeend`, getCardListElem(cardListData));
  }
});
