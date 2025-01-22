function getCardListElem(cardListData, isSlider = false) {
  let cardListElem = `<ul class="${isSlider ? `swiper-wrapper` : `cards-list`}">`;

  cardListData.forEach(({ rating, img_path, name, price }) => {
    cardListElem += `<li class="card-item${isSlider ? ` swiper-slide` : ``}">
        <article class="card">
          <span class="card__label rating-label">${rating}</span>
          <img class="card__img" src="${img_path}" alt="Изображение ${name}">
          <div class="card__content-wrap">
            <div class="card__descr-wrap">
              <h3 class="card__title">${name}</h3>
              <div class="card__price-wrap">
                <span class="card__price">${price}</span>
              </div>
              <a class="btn-clear card__btn" href="./product.html" aria-label="Переход на страницу товара ${name}">Купить</a>
            </div>
          </div>
        </article>
      </li>`;
  });

  cardListElem += `</ul>`;
  return cardListElem;
}
