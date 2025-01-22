'use strict';

function getPaginationListElem(paginationItemsCount, paginationChoosedNumb = 1) {
  let paginationListElem = `<ul class="catalog__pagination-list js-pagination-list">`;

  for (let index = 1; index <= paginationItemsCount; index++) {
    paginationListElem += `
        <li class="catalog__pagination-item">
          <button class="btn-clear catalog__pagination-btn${
            index === paginationChoosedNumb ? ` catalog__pagination-btn-active` : ``
          }" name="paginationBtn${index}"  value="${index}" aria-label="Перелистнуть на страницу ${index}">${index}</button>
        </li>`;
  }
  paginationListElem += `</ul>`;
  return paginationListElem;
}
