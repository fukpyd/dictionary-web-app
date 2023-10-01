import { THEMES } from "./constants.js";
import { toggleTheme } from "./utils.js";
// import { getData } from "./api.js";
import {
  createResult,
  createResultHeader,
  showNoResult,
  createFooter,
  changeFontStyle,
} from "./functions.js";

const themeButton = document.querySelector(".theme-input");
const currentTheme = localStorage.getItem("theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;
const themeInput = document.querySelector(".theme-input");
const url = `https://api.dictionaryapi.dev/api/v2/entries/en`;
let play = 0;
const resultWrapper = document.querySelector(".result-wrapper");
const select = document.querySelector(".font-select");

if (currentTheme === "DARK" || prefersDarkScheme.matches) {
  document.documentElement.classList.toggle("dark");
  themeInput.checked = true;
}

themeButton.addEventListener("click", () => toggleTheme(root, THEMES));

select.addEventListener("change", changeFontStyle);

async function getData(url, query) {
  try {
    const response = await fetch(`${url}/${query}`);
    const data = await response.json();

    if (!Array.isArray(data) && !data?.length) {
      showNoResult(data, query);
      return;
    }
    const resultHeader = createResultHeader(data);
    const result = createResult(data);
    const footer = createFooter(data);
    resultWrapper.insertAdjacentElement("afterbegin", resultHeader);
    resultWrapper.insertAdjacentHTML("beforeend", result);
    resultWrapper.insertAdjacentHTML("beforeend", footer);
  } catch (error) {
    console.log("Problem with server. Please contact administrator");
  }
}

// getData(url, "music");
getData(url, "hello");
// getData(url, "accomplishment");
// getData(url, "keyboard");
