//Functionality
//  Your API or db.json should return a collection
//  of at least 5 objects with each object having at least 3 attributes
//  Use at least 3 distinct event listenersLinks to an external site.
//  (3 events of different types) that enable interactivity
//   at least one instance of array iteration

document.addEventListener("DOMContentLoaded", () => {
  // Fetch Breeds and Display them
  const breedListContainer = document.getElementById('list-breeds');

  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => {
        breedListContainer.innerHTML = ""; // Clear previous content
  
        const breeds = Object.keys(data.message).slice(0, 10); // Get only the first 10 breeds
  
        breeds.forEach((breed) => {
            const breedElement = document.createElement("li");
            breedElement.textContent = breed;
            breedListContainer.appendChild(breedElement);
        });
    })
    .catch((error) => console.error("Error fetching dog breeds:", error));
  
    // Get the dog breed selected
    document.querySelector(".get-dog").addEventListener("click", function () {
        const selectedBreed = document.querySelector(".dog-selector").value;
        const imgElement = document.getElementById("image-2");
    
        fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
          .then((response) => response.json())
          .then((data) => {
              imgElement.src = data.message;
          })
          .catch((error) => console.error("Error fetching dog image:", error));
    });
    
});
