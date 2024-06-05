const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const results = document.querySelector('.results');

btn.addEventListener('click', () => {
  search.classList.toggle('active');
  input.focus();
});

const autoComplete = (event) => {
  const word = input.value;
  if (word === "") {
    results.innerHTML = "";
    return;
  }
  fetch(apiUrl + word)
    .then(response => response.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        results.innerHTML = '<p>No results found</li>';
        return;
      }
      const entry = data[0];

      results.innerHTML = `
      <h2>${entry.word}</h2>
      <p>Definition: ${entry.meanings[0].definitions[0].definition}</p>
      ${entry.meanings[0].definitions[0].example ? `<p>Example: ${entry.meanings[0].definitions[0].example}</p>` : ''}
    `;
    })
  };

input.addEventListener("keyup", autoComplete);
