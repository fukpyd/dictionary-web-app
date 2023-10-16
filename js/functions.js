const createPronunciationElement = function (text) {
  const pronunciationText = document.createElement("span");
  pronunciationText.classList.add("pronunciation");
  pronunciationText.textContent = text;

  return pronunciationText;
};

const createAudioElement = function (audio) {
  const listenAudio = document.createElement("audio");
  listenAudio.classList.add("audio");
  listenAudio.src = audio;
  const playButton = document.createElement("button");
  playButton.classList.add("pronunciation-button");
  const speakerIcon = document.createElement("span");
  speakerIcon.classList.add("speaker-icon");
  speakerIcon.innerHTML = "&#128362";
  playButton.appendChild(speakerIcon);
  playButton.addEventListener("click", () => listenAudio.play());
  return playButton;
};

const createResultListItem = function (partOfSpeech, definitions, synonyms) {
  const definitionsList = definitions.map((el) => el.definition);
  return `
        <li class="parts-of-speech">
          <div class="type-container">
            <span class="type">${partOfSpeech}</span>
            <div class="purple-line"></div>
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
          <span class="synonym-tag">Synonyms</span>
         <ul class="synonyms-list">
         ${synonyms
           .map((el) => {
             return `<li class="synonym-item">${el}</li>`;
           })
           .join("")}
    </ul>
 </div>
    </li>`;
};

export const createResultHeader = function (data) {
  const word = data[0].word;

  const headerContainer = document.createElement("header");
  headerContainer.classList.add("result-header");
  const textWrapper = document.createElement("div");
  textWrapper.classList.add("left-column");
  const phrase = document.createElement("span");
  phrase.classList.add("phrase");
  phrase.textContent = word;
  textWrapper.appendChild(phrase);
  headerContainer.appendChild(textWrapper);

  const phonetics = data[0].phonetics;

  let phoneticDetails = phonetics.find((el) => el.text && el.audio);

  phoneticDetails = phoneticDetails
    ? phoneticDetails
    : phonetics.find(
        (phonetic) =>
          phonetic.hasOwnProperty?.("text") &&
          phonetic.hasOwnProperty?.("audio")
      );

  if (!phoneticDetails) {
    return headerContainer;
  }

  const { audio, text } = phoneticDetails;

  if (text) {
    const pronunciationText = createPronunciationElement(text);
    textWrapper.appendChild(pronunciationText);
  }

  if (audio) {
    const audioElement = createAudioElement(audio);
    headerContainer.append(audioElement);
  }

  return headerContainer;
};

export const createResult = function (data) {
  const meanings = data.map((element) => element.meanings).flat();

  return ` <ul class="result-content-list">
${meanings
  .map((meanings) =>
    createResultListItem(
      meanings.partOfSpeech,
      meanings.definitions,
      meanings.synonyms
    )
  )
  .join("")}
</ul>`;
};

export const createFooter = function (data) {
  const url = data[0]?.sourceUrls[0];

  const footerText = `<footer class="result-footer">
  <span class="source-tag">Source</span>
    <a href="${url}" class="source">${url}</a>
    </footer>`;

  return footerText;
};

export const createNoResultMessage = function (query) {
  const searchMessage = `
    <h1 class="message">No results found for <span class="query"> "${query}"</span></h1>
    <p class="suggestions-title">Some suggestions</p>
    <ul class="suggestions">
      <li class="suggestion">Check spelling of all words</li>
      <li class="suggestion">Try different words mean the same thing</li>
      <li class="suggestion">Enter fewer words</li>
    </ul>
  `;
  return searchMessage;
};

export const createNoQueryMessage = function (element, elementClass) {
  const noQueryMessage = `
    <p class="message centered">Input cannot be empty</p>
  `;
  element.classList.add(elementClass);
  return noQueryMessage;
};

//przenosiny po kliknieciu na synonimy
