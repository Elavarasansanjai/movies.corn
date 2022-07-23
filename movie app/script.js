//https://omdbapi.com/?s=vikram&page=1&apikey=c33d203e
//https://omdbapi.com/?s=${moviename}&page=1&apikey=fc1fef96
//http://www.omdbapi.com/?i=tt0944947&apikey=fc1fef96
const movieContainer = document.querySelector(".con2");
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second 😃`));
    }, s * 1000);
  });
};
const spiner = (parenEl) => {
  let markup = `
     <div class="spiner">
          <img
            src="./spiner-image-removebg-preview.png"
            alt=""
            class="spiner-img"
          />
     </div>
     `;
  parenEl.innerHTML = "";
  parenEl.insertAdjacentHTML("afterbegin", markup);
};
const result_movies_container = document.querySelector(".con2");
const movies_container = document.querySelector(".con1");
const showMovie = async function () {
  try {
    //movie id
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    //spinner
    spiner(movies_container);

    // loading movie
    const res = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=fc1fef96`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status}`);
    console.log(res, data);

    let movie = {
      Actors: data.Actors,
      Awards: data.Awards,
      Country: data.Country,
      Director: data.Director,
      Genre: data.Genre,
      Language: data.Language,
      Plot: data.Plot,
      Poster: data.Poster,
      Rated: data.Rated,
      Released: data.Released,
      Title: data.Title,
      Type: data.Type,
      Year: data.Year,
      imdbId: data.imdbId,
      Writer: data.Writer,
    };
    console.log(movie);
    //rendering movie
    const markup = `
        <div class="movie-img">
          <img src="${movie.Poster}" alt="" class="img" />
        </div>
        <div class="m-his">
          <h1 class="m-title">${movie.Title}</h1>
          <p>
            Year: <span class="year">${movie.Year}</span>
            <span class="rating">Ratings:${movie.Rated}</span> Released:
            <span class="m-relese">${movie.Released}</span>
          </p>
          <p class="side">
            <strong> Genre:</strong>
            <span class="gener res">${movie.Genre}</span>
          </p>
          <p class="side">
            <strong>Writer:</strong>
            <span class="writer res">${movie.Writer}</span>
          </p>
          <p class="side">
            <strong>Actors:</strong>
            <span class="actors res">${movie.Actors}</span>
          </p>
          <p class="side">
            <strong> Plot:</strong>
            <span class="plot res">
             ${movie.Plot}
            </span>
          </p>
          <p class="language">
            <strong> Language:</strong>
            <span class="languages">${movie.Language}</span>
          </p>
          <p>
           🏆🥇${movie.Awards}
          </p>
        </div>
    `;
    movies_container.innerHTML = "";
    movies_container.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    alert(err);
  }
};

const sugetionmovies = async function (moviename) {
  try {
    spiner(movieContainer);

    const res = await fetch(
      `https://omdbapi.com/?s=${moviename}&page=1&apikey=fc1fef96`
    );
    const data = await res.json();
    console.log(res);
    // await timeout(10);
    console.log(data.Response);
    if (!(data.Response === "True"))
      throw new Error(`${moviename} ${data.Error} 😃`);
    console.log(data);

    let movies = data.Search;
    movieContainer.innerHTML = "";
    movies.forEach((mov) => {
      let markup = `
      <a href="#${mov.imdbID}" class="movies-links">
        <div class="sugesion">
          <div class="">
            <img src="${mov.Poster}" height="60" width="60" alt="" />
          </div>
          <div class="sug-his">
            <p class="tittle">${mov.Title}</p>
            <p class="year-movie">${mov.Year}</p>
          </div>
        </div>
      </a> 
      `;

      movieContainer.insertAdjacentHTML("beforeend", markup);
      window.addEventListener("hashchange", showMovie);
    });
  } catch (err) {
    movieContainer.innerHTML = "";
    movieContainer.style.padding = "20px";
    movieContainer.innerHTML = err.message;
  }
};
//sugetionmovies("vikram");

const userSearch = document.querySelector(".submit-search");

userSearch.addEventListener("click", () => {
  const usersearchValue = document.querySelector(".movie-name").value;
  if (!usersearchValue) return;
  sugetionmovies(usersearchValue);
  document.querySelector(".movie-name").value = "";
});
document.querySelectorAll(".movies-links").forEach((mov) => {
  mov.addEventListener("click", () => {
    console.log("click");
    document.querySelector(".nav").scrollIntoView({ behavior: "smooth" });
  });
});
