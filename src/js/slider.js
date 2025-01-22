`use strict`;

document.addEventListener(`DOMContentLoaded`, async () => {
  if (document.location.pathname === `/catalog.html`) {
    const sliderElem = document.querySelector('.js-slider');
    const paginationElem = document.querySelector('.js-pagination');

    const cardListData = await fetchCardList(`./json/cardsData.json`);

    sliderElem.insertAdjacentHTML(`beforeend`, getCardListElem(cardListData, true));

    const swiper = new Swiper(sliderElem, {
      slidesPerView: 2,
      spaceBetween: 13,
      slidesPerGroup: 2,
      allowTouchMove: false,
      grid: {
        fill: 'row',
        rows: 3,
      },
      pagination: {
        el: paginationElem,
        clickable: true,
        renderBullet: (index, className) => '<span class="' + className + '">' + (index + 1) + '</span>',
      },
      breakpoints: {
        // when window width is >= 960
        960: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 32,
        },
      },
    });
  }
});
