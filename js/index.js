import { THEMES, toggleTheme } from './themes.js';
import { getData, API_URL } from './api.js';
import {
  createResult,
  createResultHeader,
  createNoResultMessage,
  createFooter,
  createNoQueryMessage,
} from './functions.js';

import { changeFontStyle } from './utils.js';

const currentTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const root = document.documentElement;
const themeButton = document.querySelector('.theme-input');
const themeInput = document.querySelector('.theme-input');
const resultWrapper = document.querySelector('.result-wrapper');
const select = document.querySelector('.font-select');
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');

const errorOutlineClassName = 'red-outline';

const elements = {
  searchInput,
  errorOutlineClassName,
};

if (currentTheme === 'DARK' || prefersDarkScheme.matches) {
  root.classList.toggle('dark');
  themeInput.checked = true;
}

themeButton.addEventListener('click', () => toggleTheme(root, THEMES));

select.addEventListener('change', changeFontStyle);

const handleSubmit = async function (event, url, query, elements) {
  event.preventDefault();
  resultWrapper.innerHTML = '';

  const { searchInput, errorOutlineClassName } = elements || {};

  if (searchInput.classList.contains(errorOutlineClassName)) {
    searchInput.classList.remove(errorOutlineClassName);
  }

  if (!query) {
    const noQueryMessage = createNoQueryMessage(
      searchInput,
      errorOutlineClassName
    );
    resultWrapper.insertAdjacentHTML('afterbegin', noQueryMessage);

    return;
  }

  const data = await getData(url, query);

  if (!Array.isArray(data) && !data?.length) {
    const noResultMessage = createNoResultMessage(query);
    resultWrapper.insertAdjacentHTML('afterbegin', noResultMessage);
    return;
  }

  const resultHeader = createResultHeader(data);
  const result = createResult(data);
  const footer = createFooter(data);

  resultWrapper.insertAdjacentElement('afterbegin', resultHeader);
  resultWrapper.insertAdjacentHTML('beforeend', result);
  resultWrapper.insertAdjacentHTML('beforeend', footer);

  const synonymsLists = [...document.querySelectorAll('.synonyms-list')];
  synonymsLists.map((synonymsList) =>
    synonymsList.addEventListener('click', (e) => {
      handleSubmit(e, url, e.target.textContent, elements);
      searchInput.value = e.target.textContent;
    })
  );
};

searchButton.addEventListener('click', (event) => {
  handleSubmit(event, API_URL, searchInput.value, elements);
});

searchButton.addEventListener('keyup', function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    handleSubmit(event, API_URL, searchInput.value, elements);
  }
});
