



async function mainEvent() {
    const mainForm = document.querySelector('.main_form');

    let currentList = [];

    mainForm.addEventListener('submit', async (buttonEvent) => {
        buttonEvent.preventDefault()
        console.log('search')
        const formData = new FormData(mainForm);
        const formProps = Object.fromEntries(formData);
        console.log(formProps)
        const results = await fetch(`http://openlibrary.org/search.json?q=${formProps['q']}`);
        currentList = await results.json();
        console.table(currentList); 
        console.log(currentList)
      
        console.log(formProps)
    });

}

document.addEventListener('DOMContentLoaded', async () => mainEvent());