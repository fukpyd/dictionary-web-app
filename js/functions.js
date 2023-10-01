export const createResultHeader = function (data) {
  const word = data[0].word;
  const phonetics = data[0].phonetics;

  const pronunciation = phonetics.find((el) => el.text && el.audio);

  const headerContainer = document.createElement("header");
  headerContainer.classList.add("lexico-entry");

  const textWrapper = document.createElement("div");
  textWrapper.classList.add("lexico-left-column");

  const phrase = document.createElement("span");
  phrase.classList.add("lexico-phrase");
  phrase.textContent = word;

  const pronunciationText = document.createElement("span");
  pronunciationText.classList.add("lexico-pronunciation");
  pronunciationText.textContent = pronunciation.text;

  const audio = document.createElement("audio");
  audio.classList.add("audio");
  audio.src = pronunciation.audio;

  const playButton = document.createElement("button");
  playButton.classList.add("pronunciation-button");

  playButton.addEventListener("click", () => audio.play());

  const speakerIcon = document.createElement("span");
  speakerIcon.classList.add("speaker");
  speakerIcon.innerHTML = "&#128362";

  textWrapper.append(phrase, pronunciationText);

  playButton.appendChild(speakerIcon);

  headerContainer.append(textWrapper, playButton, audio);
  return headerContainer;
};

const createResultListItem = function (partOfSpeech, definitions, synonyms) {
  const definitionsList = definitions.map((el) => el.definition);
  return `
        <div class="parts-of-speech">
          <div class="part-of-speech-container">
            <span class="part-of-speech">${partOfSpeech}</span>
            <div class="purple-line-container">
              <div class="purple-line"></div>
            </div>
          </div>
          <span class="meaning">Meaning</span>
          <ul class="definitions-list">
            ${definitionsList
              .map((definition) => {
                return `<li class="definition">${definition}</li>`;
              })
              .join("")}
         </ul>
       <div class="synonyms">
          <span class="synonyms-tag">Synonyms</span>
         <ul class="synonyms-list">
         ${synonyms
           .map((el) => {
             return `<li class="synonym-item">${el}</li>`;
           })
           .join("")}
    </ul>
 </div>
    </div>`;
};

export const createResult = function (data) {
  const meanings = data.map((element) => element.meanings).flat();
  console.log("meanings", meanings);

  //   const resultHeader = createResultHeader(data);

  const resultItems = meanings
    .map((meanings) =>
      createResultListItem(
        meanings.partOfSpeech,
        meanings.definitions,
        meanings.synonyms
      )
    )
    .join("");

  //   const showResultItems = meanings.map(
  //     ({ partOfSpeech, definitions, synonyms }) =>
  //       createResultItem(partOfSpeech, definitions, synonyms)
  //   );

  return resultItems;
};

export const showNoResult = function (error, query) {
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

export const createFooter = function (data) {
  const url = data[0]?.sourceUrls[0];

  const footerText = `<footer>
  <span class="source-tag">Source</span>
    <a href="${url}" class="source">${url}</a>
    </footer>`;

  return footerText;
};

export const changeFontStyle = function (event) {
  [...document.getElementsByTagName("body")][0].style.fontFamily =
    event.target.value;
};
