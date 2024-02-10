
import data from '/private.json' assert { type: 'json' };
const API = data["api"];

const APILINIK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key='+ API +'&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key='+ API +'&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINIK)

function returnMovies(url) {
    fetch(url).then(res => res.json())
    .then(function(data){
        // console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_col = document.createElement('div');
            div_col.setAttribute('class', 'col');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const div_center = document.createElement('div');
            div_center.setAttribute('class', 'center');

            title.innerHTML = `${element.title}`;
            image.src = IMG_PATH +element.poster_path;

            div_center.appendChild(image);
            div_card.appendChild(div_center);
            div_card.appendChild(title);
            div_col.appendChild(div_card);
            div_row.appendChild(div_card);
            main.appendChild(div_row);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = '';
    }
});