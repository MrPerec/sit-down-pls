`use strict`;

document.addEventListener(`DOMContentLoaded`, () => {
  const searchBtn = document.querySelector('.js-search-btn');
  const searchInput = document.querySelector('.js-search-input');

  searchInput.addEventListener('input', async (event) => {
    searchBtn.setAttribute('disabled', '');
    if (searchInput.value) searchBtn.removeAttribute('disabled', '');
  });
});
