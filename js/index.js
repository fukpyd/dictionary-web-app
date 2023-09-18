import { THEMES } from "./constants.js";
import { toggleTheme } from "./utils.js";
// import { getData } from "./api.js";

const themeButton = document.querySelector(".theme-input");
const currentTheme = localStorage.getItem("theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;
const themeInput = document.querySelector(".theme-input");
const url = `https://api.dictionaryapi.dev/api/v2/entries/en`;

if (currentTheme === "DARK" || prefersDarkScheme.matches) {
  document.documentElement.classList.toggle("dark");
  themeInput.checked = true;
}

themeButton.addEventListener("click", () => toggleTheme(root, THEMES));

async function getData(url, query) {
  try {
    const response = await fetch(`${url}/${query}`);
    if (!response.ok) {
      throw new Error(`Data not found ${error.status}`);
    }

    // console.log(response);
    const data = await response.json();
    // console.log(query, data);

    const check = data[0];
    const { license, meanings, phonetic, sourceUrls, word } = check || {};
    // console.log(check);

    // console.log(phonetics);

    const partOfSpeechArr = [];
    const definitionsArr = [];
    const synonymsArr = [];
    const antonymsArr = [];

    meanings.forEach((meaning) => {
      const { partOfSpeech, definitions, synonyms, antonyms } = meaning;

      partOfSpeechArr.push(partOfSpeech);
      definitionsArr.push(definitions);
      synonymsArr.push(synonyms);
      antonymsArr.push(antonyms);
      // console.log(partOfSpeechArr);
      // console.log(definitionsArr);
      // console.log(synonymsArr);
    });
    //     antonymsArr.forEach((antonym) => {
    // if (antonym.length === 0) {
    //    to co???
    // } else {

    // }

    console.log(query, data);

    //     })
    // if (antonymsArr.length === 0) {
    //   return; // będzie w praktyce, żeny nic nie wpisywać
    // } else {
    //   console.log(antonymsArr); // a w przeciwnym wypadku wpisać po przecinku te antonimy. znowu forEach??
    // }

    // console.log(antonymsArr);
  } catch {}
}
getData(url, "hello");
getData(url, "mother");
getData(url, "music");
// getData(url, "keyboard");

//chce przelecieć po kazdym leemecie arraya i wyciągnąć z niego partOsSpeech, definitions, synonyms, antonyms
