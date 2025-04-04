//Functionality
//  Your API or db.json should return a collection
//  of at least 5 objects with each object having at least 3 attributes
//  Use at least 3 distinct event listenersLinks to an external site.
//  (3 events of different types) that enable interactivity
//   at least one instance of array iteration

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".dog-form");
  const breedSelector = document.querySelector(".dog-selector");
  const imgElement = document.getElementById("image-2");
  const messageContainer = document.getElementById("message");
  const subBreedBtn = document.querySelector(".list-sub-breeds");
  const subBreedList = document.getElementById("sub-breed-list");

  // Function to format breed name
  function formatBreedName(breed) {
    let parts = breed.toLowerCase().split(" ");
    if (parts.length > 1) {
      return `${parts[1]}/${parts[0]}`; // Convert "kerryblue terrier" => "terrier/kerryblue"
    }
    return parts[0]; // Single-word breeds remain unchanged
  }

  //Fetch Breed Names and Display them on the select option
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => {
      if (!response.ok) {
        throw new Error("404");
      }
      return response.json();
    })
    .then((data) => {
      const dogSelector = document.getElementById("dog-selector");
      if (data.message) {
        Object.keys(data.message).forEach((breed) => {
          //data.message is an object,,so I traverse first
          const option = document.createElement("option");
          option.textContent = breed;
          dogSelector.appendChild(option);
        });
      }
    });

  // Fetch Dog Image
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedBreed = breedSelector.value.trim();
    if (!selectedBreed) {
      messageContainer.textContent = "Please select a breed first!";
      return;
    }

    const formattedBreed = formatBreedName(selectedBreed); //Invoke the function to format breed name
    const imageUrl = `https://dog.ceo/api/breed/${formattedBreed}/images/random`;

    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("404");
        }
        return response.json();
      })
      .then((data) => {
        imgElement.src = data.message;
        imgElement.style.display = "block";
        messageContainer.textContent = "";
      })
      .catch((error) => {
        if (error.message === "404") {
          messageContainer.innerHTML = `<span style="color:red;">Sorry, no images available for "${selectedBreed}".</span>`;
          imgElement.style.display = "none";
        } else {
          console.error("Error fetching dog image:", error);
        }
      });
  });

  // Fetch Sub-Breeds
  subBreedBtn.addEventListener("click", () => {
    const selectedBreed = breedSelector.value.trim(); //get Sub Breeds for the breed we selected
    if (!selectedBreed) {
      subBreedList.innerHTML = `<li>Please select a breed first!</li>`;
      return;
    }

    const formattedBreed = formatBreedName(selectedBreed).split("/")[0]; // Only main breed
    const subBreedUrl = `https://dog.ceo/api/breed/${formattedBreed}/list`;

    fetch(subBreedUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("404");
        }
        return response.json();
      })
      .then((data) => {
        subBreedList.innerHTML = "";

        if (data.message.length > 0) {
          data.message.forEach((subBreed) => {
            const li = document.createElement("li");
            li.textContent = subBreed;
            subBreedList.appendChild(li);
          });
        } else {
          subBreedList.innerHTML = `<li style="color:black; font-weight:bold;">The breed "${selectedBreed}" has no sub-breeds.</li>`;
        }
      })
      .catch((error) => {
        if (error.message === "404") {
          subBreedList.innerHTML = `<li style="color:red;">Sorry, sub-breeds for "${selectedBreed}" are not available.</li>`;
        } else {
          console.error("Error fetching sub-breeds:", error);
        }
      });
  });
});
