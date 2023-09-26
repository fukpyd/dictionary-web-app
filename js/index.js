import { THEMES } from "./constants.js";
import { toggleTheme } from "./utils.js";
// import { getData } from "./api.js";
import { createResultContent } from "./functions.js";

const themeButton = document.querySelector(".theme-input");
const currentTheme = localStorage.getItem("theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.documentElement;
const themeInput = document.querySelector(".theme-input");
const url = `https://api.dictionaryapi.dev/api/v2/entries/en`;
const resultWrapper = document.querySelector(".result-wrapper");

if (currentTheme === "DARK" || prefersDarkScheme.matches) {
  document.documentElement.classList.toggle("dark");
  themeInput.checked = true;
}

const showNoResult = function (error, query) {
  const searchMessage = `
<div class="search-message">
  <h1 class="message-heading">${error.title} for <span class="query"> "${query}"</span></h1>
  <span class="suggestions">Some suggestions</span>
  <ul class="suggestions-list">
    <li class="suggestion-item">Check spelling of all words</li>
    <li class="suggestion-item">Try different words mean the same thing</li>
    <li class="suggestion-item">Enter fewer words</li>
  </ul>
</div>
`;

  resultWrapper.insertAdjacentHTML("afterbegin", searchMessage);
};

themeButton.addEventListener("click", () => toggleTheme(root, THEMES));

async function getData(url, query) {
  try {
    const response = await fetch(`${url}/${query}`);
    const data = await response.json();
    console.log("data", data);

    if (!Array.isArray(data) && !data?.length) {
      showNoResult(data, query);
      return;
    }

    const result = createResultContent(data);

    resultWrapper.insertAdjacentHTML("afterbegin", result);

    // const meanings = data[0].meanings;

    // meanings.forEach((meaning) => {
    //   const definitions = meaning.definitions;
    //   console.log(definitions);
    //   let ul = document.createElement("ul");

    //   const definition = definitions.forEach((el) => {
    //     let li = document.createElement("li");
    //     li.innerText = el;
    //     ul.appendChild(li);
    //   });
    // });

    // function dupa7(meanings) {
    //   const definitionsList = document.createElement("ul");

    //   const showResult = meanings.map((meaning) => {
    //     return `<div class="result-wrapper">
    //
    //     <div class="parts-of-speech">
    //       <div class="part-of-speech-container">
    //         <span class="part-of-speech">${meaning.partOfSpeech}</span>
    //         <div class="purple-line-container">
    //           <div class="purple-line"></div>
    //         </div>
    //       </div>
    //       <span class="meaning">Meaning</span>
    //       <ul class="definitions-list">
    // //         <li class="definition">
    // //           (etc.) A set of keys ussed to operate a typewriter, computer, etc.
    // //         </li>
    // //         <li class="example">
    // //           A component of many instruments including the piano, organ, and
    // //           harpsihord consisting of usually black and white keys that cause
    // //           different tones to be produced when struck.
    // //         </li>
    // //         <li class="example">
    // //           A device with keys of a musical keyboard, used to control
    // //           electronic sound - producing devices which may be built into or
    // //           separate from the keyboard device.
    // //         </li>
    // //       </ul>
    // //       <div class="synonyms">
    // //         <span class="synonyms-tag">Synonyms</span>
    // //         <ul class="synonyms-list">
    // //           <li class="synonym-item">electronic keyboard</li>
    // //         </ul>
    // //       </div>
    // //     </div>
    // //     <div class="parts-of-speech">
    // //       <div class="part-of-speech-container">
    // //         <span class="part-of-speech">noun</span>
    // //         <div class="purple-line-container">
    // //           <div class="purple-line"></div>
    // //         </div>
    // //       </div>
    // //       <span class="meaning">Meaning</span>
    // //       <ul class="examples-list">
    // //         <li class="example">To type on a computer keyboard.</li>
    // //       </ul>
    // //       <span class="usage"
    // //         >"Keyboarding is the part of this job I hate the most"</span
    // //       >
    // //     </div>
    // //   });

    // //   resultWrapper.insertAdjacentHTML("afterbegin", dupowate);
    // // }

    // });
  } catch (error) {
    console.log(error);
    console.log("Problem with server. Please contact administrator");
  }
}

// getData(url, "music");
// getData(url, "hello");
getData(url, "mother");
// getData(url, "keyboard");

// meanings.forEach((meaning) => {
//   const definitions = meaning.definitions;
//   const synonyms = meaning.synonyms;
//   const antonyms = meaning.antonyms;
//   definitionsArr.push(definitions);
//   synonymsArr.push(synonyms);
//   antonymsArr.push(antonyms);
// });

// const meanings = check.meanings;
// const word = check.word;
// const synonyms = meanings.synonyms;
// const antonyms = meanings.antonyms;

// console.log(word);

// const phon = phonetic.find((el) => el.text);
// console.log(phon.text);
// const defIn = [];
// const bla = [];
// console.log(meanings);
// meanings.forEach((meaning) => {
//   const lol = { ...meaning };
//   console.log(lol);
//   const partOfSpeech = lol.partOfSpeech;
//   const definitions = lol.definitions;

//   definitions.forEach((def) => {
//     const newly = def.definition;
//     defIn.push(newly);
//   });

//   bla.push(partOfSpeech);
//   bla.push(defIn);
//   console.log(bla);
//   const synonyms = lol.synonyms;
//   const antonyms = lol.antonyms;
// });

// bla.forEach((el) => {
//   if (Array.isArray(el)) {
//     el.forEach((element) => {
//       const def = element.definition;
//     });
//   }
// });
// const partOfSpeechArr = [];
// const definitionsArr = [];
// const synonymsArr = [];
// const antonymsArr = [];
// const arr = [];

// meanings.forEach((meaning) => {
//   const { partOfSpeech, definitions, synonyms, antonyms } = meaning;
//   partOfSpeechArr.push(partOfSpeech);
//   definitionsArr.push(definitions);
//   synonymsArr.push(synonyms);
//   antonymsArr.push(antonyms);
// });
// console.log(meanings);

// definitionsArr.forEach((el) => {
//   for (let i = 0; i < el.length; i++) {
//     const definitions = el[i];
//     const def = definitions.definition;
//     console.log(def);
//   }
// });

// synonymsArr.forEach((el) => {
//   if (el.length === 0 || false) {
//     return;
//   } else {
//     for (let i = 0; i < el.length; i++) {
//       console.log(`Synonym -------- ${el[i]}`);
//     }
//   }
// });

// antonymsArr.forEach((el) => {
//   if (el.length === 0 || false) {
//     return;
//   } else {
//     for (let i = 0; i < el.length; i++) {
//       console.log(`Antonym  ----- ${el[i]}`);
//     }
//   }
