let APIKEY = '7uFws0LT7dsfeLfnRmj9AY01HqCkEGra';
const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=`;

const gif_continer = document.getElementById('gif-container');
const gif_count = 20;


const searchGifs = async (event) => {
  event.preventDefault();
  const title = document.getElementById("gif-name").value;
  const res = await fetch(`${url}${title}&limit=${gif_count}`)
  const data = await res.json()
  // console.log(data);
  createGifCards(data.data);
}

const createGifCards = (gifs) => {
  gif_continer.innerHTML = ''; // Clear previous results
  gifs.forEach((gif, index) => {
    const gifElement = document.createElement('div');
    gifElement.classList.add('gif');

    const gifInnerHtml = `
      <div class="img-container">
        <img src="${gif.images.fixed_height.url}" alt="">
      </div>
      <div class="info">
        <small id="number">${index + 1}</small>
        <button class="download-btn" data-url="${gif.images.original.url}">Download</button>
      </div>`;

    gifElement.innerHTML = gifInnerHtml;
    gif_continer.appendChild(gifElement);
  });
    // Add event listener to all download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
      button.addEventListener('click', handleDownload);
    });
}

const handleDownload = (event) => {
  const gifUrl = event.target.dataset.url;
  const fileName = gifUrl.substring(gifUrl.lastIndexOf('/') + 1); // Extract filename from URL
  fetch(gifUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(error => console.error('Error downloading GIF:', error));
}

const form = document.getElementById("search-gifs");
form.addEventListener("submit", searchGifs)
