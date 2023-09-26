// const createResultHeader = function (word, pronunciation, audio) {
//   const word = data[0].word;

//   const phonetics = data[0].phonetics;
//   const phoneticDetails = phonetics.find((el) => el.text && el.audio);

//   // tutaj mam zapis fonetyczny i link do audio, potem wyciągam dane z OBIEKTU czyli np. phoneticDetails.text
// const playButton = document.createElement("button");
// playButton.classList.add("pronunciation-button");

//   const headingStructure = `

// <div class="lexico-entry">
//           <span class="lexico-phrase">${word}</span>
//           <button class="pronunciation-button">
//             <svg class="button-icon" viewBox="0 0 63.9 122.88">
//               <style type="text/css"></style>
//               <g>
//                 <polygon
//                   class="st0"
//                   points="63.9,61.44 0,122.88 0,0 63.9,61.44"
//                 />
//               </g>
//             </svg>
//           </button>
//         </div>
//         <span class="lexico-pronunciation">/${phoneticDetails.text}</span>`;
// };

const createResultItem = function (partOfSpeech, definitions, synonyms) {
  const definitionsList = definitions.map((el) => el.definition);

  console.log("definitions", definitionsList);
  console.log("synonimy", synonyms);

  const x = definitionsList.map((definition) => {
    return `<li class="definition">${definition}</li>`;
  });

  console.log("x", x);
  console.log(x.join(""));

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

{
}

export const createResultContent = function (data) {
  const meanings = data.map((element) => element.meanings).flat();
  console.log("meanings", meanings);

  const dupa7 = meanings.map((meaning) =>
    createResultItem(
      meaning.partOfSpeech,
      meaning.definitions,
      meaning.synonyms
    )
  );

  return dupa7.join("");
};
