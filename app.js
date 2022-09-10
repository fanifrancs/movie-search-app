let inputField = document.querySelector('input');
let searchBtn = document.querySelector('button');
let container = document.querySelector('.container');
let query, url, res, data;

searchBtn.addEventListener('click', getMovies);

async function getMovies(event) {
  event.preventDefault();
  container.innerHTML = '';
  query = inputField.value;
  url = 'https://www.omdbapi.com/?apikey=1691f1b1&s=' + query;
  try {
    res = await fetch(url);
    if (res.status === 200) {
      data = await res.text();
      renderMovies(JSON.parse(data));
    } else {
      alert('Something went wrong')
    }
  } catch(error) {
    console.log(error);
  }
}

// below is the XMLHttpRequest code I first used
// before switching to fetch api above. Either
// one works fine : )

// function getMovies(event) {
//     event.preventDefault();
//     container.innerHTML = '';
//     let query= inputField.value;
//     let xhr = new XMLHttpRequest();
//     let url = 'https://www.omdbapi.com/?apikey=1691f1b1&s=' + query;
//     xhr.open('GET', url);
//     xhr.onload = function() {
//         if (this.status === 200) {
//             renderMovies(JSON.parse(this.responseText));
//         } else {
//             alert('Something went wrong');
//         }
//     }
//     xhr.onerror = function() {
//         alert('Something went wrong');
//     }
//     xhr.send();
// }

function renderMovies(param) {
    param['Search'].forEach((movie) => {
        container.innerHTML += `
        <div class="gallery">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="desc">
                <span>${movie.Title}</span> <span>(${movie.Year})</span> 
                <p>${movie.Type}</p>
            </div>
        </div>`
    })
}