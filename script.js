

const API_URL = "https://www.omdbapi.com/?apikey=db2a5b50";


document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("movie-input").value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    alert("Please enter a movie name!");
  }
});



async function fetchMovies(query) {
  try {
    const response = await fetch(`${API_URL}&s=${query}`);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      displayError(data.Error);
    }
  } catch (error) {
    displayError("An error occurred while fetching movies.");
  }
}


function displayMovies(movies) {
  const container = document.getElementById("movie-container");
  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    movieCard.innerHTML = `
      <div class="movie-details">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100"}" alt="Movie Poster">
        <div class="movie-info">
          <div class="movie-title">${movie.Title}</div>
          <div class="movie-year">Year: ${movie.Year}</div>
        </div>
      </div>
    `;
    container.appendChild(movieCard);
  });
}


function displayError(message) {
  const container = document.getElementById("movie-container");
  container.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;
}
