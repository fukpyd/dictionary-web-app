import { THEMES } from "./constants.js";
import { toggleTheme } from "./utils.js";
import { getData } from "./api.js";
import {
  createResult,
  createResultHeader,
  showNoResult,
  createFooter,
  changeFontStyle,
  showNoQuery,
  clearResultWrapper,
} from "./functions.js";

const themeButton = document.querySelector(".theme-input");
const currentTheme = localStorage.getItem("theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;
const themeInput = document.querySelector(".theme-input");
const url = `https://api.dictionaryapi.dev/api/v2/entries/en`;
const resultWrapper = document.querySelector(".result-wrapper");
const select = document.querySelector(".font-select");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const inputClass = "no-query-message";

if (currentTheme === "DARK" || prefersDarkScheme.matches) {
  document.documentElement.classList.toggle("dark");
  themeInput.checked = true;
}

themeButton.addEventListener("click", () => toggleTheme(root, THEMES));

select.addEventListener("change", changeFontStyle);

const handleSubmit = async function (event, url, query, element, elementClass) {
  event.preventDefault();
  resultWrapper.innerHTML = "";

  if (element.classList.contains(elementClass)) {
    element.classList.remove(elementClass);
  }

  if (!query) {
    const noQueryMessage = showNoQuery(searchInput, inputClass, resultWrapper);
    resultWrapper.insertAdjacentHTML("afterbegin", noQueryMessage);
    return;
  }

  const data = await getData(url, query);

  if (!Array.isArray(data) && !data?.length) {
    const noResultMessage = showNoResult(query, searchInput);
    resultWrapper.insertAdjacentHTML("afterbegin", noResultMessage);
    return;
  }

  const resultHeader = createResultHeader(data);
  console.log(resultHeader);
  const result = createResult(data);
  const footer = createFooter(data);
  resultWrapper.insertAdjacentElement("beforeend", resultHeader);
  resultWrapper.insertAdjacentHTML("beforeend", result);
  resultWrapper.insertAdjacentHTML("beforeend", footer);
};

searchButton.addEventListener("click", (event) =>
  handleSubmit(event, url, searchInput.value, searchInput, inputClass)
);

searchButton.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    handleSubmit(event, url, searchInput.value, searchInput, inputClass);
  }
});
