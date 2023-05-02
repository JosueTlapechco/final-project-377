async function mainEvent() {
    const mainForm = document.querySelector('.main_form');
    const bookEdition = document.querySelector('.book');

    let currentList = [];
    
    let workID = '';

    mainForm.addEventListener('submit', async (buttonEvent) => {
        buttonEvent.preventDefault()
        //console.log('search')
        const formData = new FormData(mainForm);
        const formProps = Object.fromEntries(formData);
        //console.log(formProps)
        const results = await fetch(`http://openlibrary.org/search.json?q=${formProps['q']}`);
        currentList = await results.json();
        workID = currentList['docs'][0]['key']
        console.table(currentList); 
        console.log('workid', workID);
       
    });

    /*bookEdition.addEventListener('submit', (buttonEvent) =>{
        buttonEvent.preventDefault()
        const formData = new FormData(bookEdition);
        const formProps = Object.fromEntries(formData);
        console.log(formProps)
        console.log('button')
        const results = fetch(`http://openlibrary.org${workID}.json`);
        newList = results
        console.log(workID)
        console.log(newList)
    })*/
   
    
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());