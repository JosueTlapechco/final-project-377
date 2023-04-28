
function filterList(list, query) {
    /*
      Using the .filter array method, 
      return a list that is filtered by comparing the item name in lower case
      to the query in lower case
      Ask the TAs if you need help with this
    */
    return list.filter((item)=>{
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery)
    })
  }


async function mainEvent() {
    const mainForm = document.querySelector('.main_form');
    const filterButton = document.querySelector('.filter_button');

    let currentList = [];

    mainForm.addEventListener('submit', async (buttonEvent) => {
        buttonEvent.preventDefault()
        console.log('search')
        const results = await fetch('http://openlibrary.org/search.json?q=');
        currentList = await results.json();
        console.table(currentList); 
    });

    filterButton.addEventListener("click", (event)=>{
        console.log('clicked filterButton');
      
        const formData = new FormData(mainForm);
        const formProps = Object.fromEntries(formData);
    
        console.log(formProps);
        const newList = filterList(currentList, formProps.resto);
        
        console.log(newList)
        
      })
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());