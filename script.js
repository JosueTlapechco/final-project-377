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

async function fetchCover(coverID){
    const cover = await fetch(`https://covers.openlibrary.org/b/id/${coverID}-L.jpg`)
    console.log(cover.url);

    return cover.url;
}

function injectHTML(list) {
    console.log("fired injectHTML");
    const target = document.querySelector("#description");
    target.innerHTML = "";
    target.innerHTML += list;
  }

function putImage(imageList){
    for(i = 0; i <= imageList.length - 1; i++){
        document.querySelector('carousel_item').src = JSON.stringify(imageList[i]);
    }
}

function createimageList(coverID){
    let newList = [];
    for(i = 0; i <= coverID.length - 1; i++){
        newList.push(fetchCover(coverID[i]));
    }
   
    return newList;
}
async function mainEvent(buttonEvent) {
    buttonEvent.preventDefault();

    const mainForm = document.querySelector('.main_form');

    let currentList = [];
    let workID = '';

    const formData = new FormData(mainForm);
    const formProps = Object.fromEntries(formData);
    currentList = await fetchSearchResults(formProps['q']);
    workID = currentList['docs'][0]['key'];

    const workDetailsJson = await fetchWorkDetails(workID);
    console.log('Work Details:', workDetailsJson);

    const description = workDetailsJson.description ? workDetailsJson.description : 'No description available';
    const covers = workDetailsJson.covers || [];
    const authors = workDetailsJson.authors ? fetchWorkDetails(workDetailsJson.authors[0]['author']['key']) : [];

    console.log(workDetailsJson.authors[0]['author']['key'], typeof JSON.stringify(workDetailsJson.authors[0]['author']))
    console.log('Covers:', covers);
    console.log('Authors:', authors);

    injectHTML(description)
    imageList = createimageList(covers);
    console.log(imageList, 'created list');
    putImage(imageList);
}
