async function fetchSearchResults(query) {
  const results = await fetch(`http://openlibrary.org/search.json?q=${query}`);
  const resultList = await results.json();
  return resultList;
}

async function fetchWorkDetails(workID) {
  const workDetails = await fetch(`https://openlibrary.org${workID}.json`);
  const workDetailsJson = await workDetails.json();
  return workDetailsJson;
}

async function fetchCover(coverID) {
  const cover = await fetch(
    `https://covers.openlibrary.org/b/id/${coverID}-L.jpg`
  );

  return cover.url;
}

function injectHTML(list) {
  console.log("fired injectHTML");
  const target = document.querySelector("#description");
  target.innerHTML = "";
  target.innerHTML += list;
}

function putImage(imageList) {
  let html = [];
  for (i = 0; i <= imageList.length - 1; i++) {
    // document.querySelector('#carousel_item').src = JSON.stringify(imageList[i]);
    html.push(
      ` <div class="carousel_item "><img src=${JSON.stringify(
        imageList[i]
      )}></div>`
    );
  }
  document.querySelector("#slides").innerHTML = html.join(' ');
}

async function createimageList(coverID) {
  let newList = [];
  for (i = 0; i <= coverID.length - 1; i++) {
    const cover = await fetchCover(coverID[i]);
    newList.push(cover);
  }
  console.log(newList);
  return newList;
}

function slides() {
  let slidePosition = 0;
  const slides = document.getElementsByClassName("carousel_item");
  const slidesArray = Array.from(slides);
  const totalSlides = slidesArray.length;

  function updateSlidePosition() {
    console.log(slidesArray);
    slidesArray.forEach((slide) => {
      slide.classList.remove("visible");
      slide.classList.add("hidden");
    });
    console.log(slidePosition);
    slides[slidePosition].classList.add("visible");
  }
  function moveToNextSlide() {

    if (slidePosition === totalSlides - 1) {
      slidePosition = 0;
    } else {
      slidePosition += 1;
    }
    updateSlidePosition();
  }

  function moveToPrevSlide() {
   
    if (slidePosition === 0) {
      slidePosition = totalSlides - 1;
    } else {
      slidePosition -= 1;
    }
    updateSlidePosition();
  }

  document
    .querySelector(".next")
    .addEventListener("click", () => {
      
      console.log("clicked next"); 
      moveToNextSlide(); 
    });

  document
    .querySelector(".prev") 
    .addEventListener("click", () => {
      console.log("clicked prev"); 
      moveToPrevSlide(); 
    });
}
async function mainEvent() {
  document
    .querySelector(".main_form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      let currentList = [];
      let workID = "";

      const mainForm = document.querySelector(".main_form");

      const formData = new FormData(mainForm);
      const formProps = Object.fromEntries(formData);
      currentList = await fetchSearchResults(formProps["q"]);
      workID = currentList["docs"][0]["key"];

      const workDetailsJson = await fetchWorkDetails(workID);
      console.log("Work Details:", workDetailsJson);

      const description = workDetailsJson.description
        ? workDetailsJson.description
        : "No description available";
      const covers = workDetailsJson.covers || [];
      const authors = workDetailsJson.authors
        ? await fetchWorkDetails(workDetailsJson.authors[0]["author"]["key"])
        : [];

      console.log(
        workDetailsJson.authors[0]["author"]["key"],
        typeof JSON.stringify(workDetailsJson.authors[0]["author"])
      );
      console.log("Covers:", covers);
      console.log("Authors:", authors);

      injectHTML(description);
      imageList = await createimageList(covers);
      putImage(imageList);
      console.log(document.querySelector("#carousel"));
      const list = document.querySelector(".carousel_item").innerHTML;
      console.log(list);
      slides();
    });
}
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API requests
