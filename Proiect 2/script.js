// Define the API endpoint
const apiUrl = "https://www.omdbapi.com/?apikey=f28a2f9c&type=movie&s=";

// Define the search button and input elements
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

// Define the movie row element
const movieRow = document.getElementById("movie-row");

// Add an event listener to the search button
searchButton.addEventListener("click", async function (event) {
  event.preventDefault();
  // Get the search query from the input field
  const searchQuery = searchInput.value;
  // Call the API with the search query
  const response = await fetch(apiUrl + searchQuery);
  const data = await response.json();
  // Check if the API returned any results
  if (data.Response === "True") {
    // Clear the previous search results
    movieRow.innerHTML = "";
    // Create a new Results container element
    const resultsContainer = document.createElement("div");
    resultsContainer.classList.add("w-100");
    // Create a new Results title element
    const resultsTitle = document.createElement("h2");
    resultsTitle.innerText = "Results for " + searchQuery;
    // Append the Results title to the Results container
    resultsContainer.appendChild(resultsTitle);
    // Append the Results container to the movie row
    movieRow.appendChild(resultsContainer);
    // Loop through the search results and create a card for each movie
    for (let i = 0; i < data.Search.length; i++) {
      // Call the API again with the imdbID of the selected movie to get the details
      const imdbID = data.Search[i].imdbID;
      const response2 = await fetch(apiUrl + "&i=" + imdbID);
      const data2 = await response2.json();
      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("card", "mb-3", "col-md-2");
      // Create a new image element
      const image = document.createElement("img");
      image.classList.add("card-img-top");
      image.src = data2.Poster;
      image.alt = "Movie Image";
      // Create a new card body element
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      // Create a new card title element
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = data2.Title;
      // Create a new card text element for the year and genre
      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerText = data2.Year + "\n" + data2.Genre;
      // Append the image, title, and text to the card body
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      // Append the image and card body to the card
      card.appendChild(image);
      card.appendChild(cardBody);
      // Append the card to the movie row
      movieRow.appendChild(card);
    }
  } else {
    // Clear the previous search results
    movieRow.innerHTML = "";
    alert("No results found.");
  }
});
