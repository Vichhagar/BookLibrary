const book = document.querySelector('.main');
const search = document.querySelector('form');
const title = document.querySelector('h1');
const scrollBar = document.querySelector('.progress-container');

//API CALL
const searchBook = async (query) => {
    book.innerHTML = '<h1>Connecting to API...</h1>';
    const respond =  await fetch(`https://www.dbooks.org/api/search/${query}`);
    const data = await respond.json();
    book.innerHTML = '';

    return data;
}

const getBook = async () => {
    book.innerHTML = '<h1>Connecting to API...</h1>';
    const respond =  await fetch('https://www.dbooks.org/api/recent');
    const data = await respond.json();
    return data;
}

const getBookDetail = async (id) => {
    const respond = await fetch(`https://www.dbooks.org/api/book/${id}`);
    const data = await respond.json();
    return data;
}

const printData = (data) => {
    if (data != null) {
        for(let i = 0; i <= data.length; i++) {
            //getting each book detial
            getBookDetail(data[i].id).then(e => {
                // console.log(data[i].image);
                // console.log(e)
                book.innerHTML += 
                `
                <div class="book">
                    <div>
                        <img src="${data[i].image}" alt="">
                    </div>
                    <div class="detial">
                        <h2>${e.title}</h2>
                        <h4>${e.subtitle}</h4>
                        <p>${e.description}</p>
                        <p>Authors: ${e.authors}</p>
                        <p>Publisher: ${e.publisher}</p>
                        <p>Number of pages: ${e.pages}</p>
                        <p>Year: ${e.year}</p>
                        <a href="${e.download}">Download</a>
                    </div>
                </div>
                `
            })
        }
    } else {
        book.innerHTML = '<h1 style="color: red">Sorry! We cannot find the book you are looing for.</h1>';
    }
}

search.addEventListener('submit', e => {
    e.preventDefault();
    const query = search.input.value.trim();
    search.reset();
    searchBook(query).then(data => {
        //run the forloop in print
        printData(data.books);
    }).catch (e => {
        // book.innerHTML = '<h1>Sorry! We cannot find the book you are looing for.</h1>';
        // console.log(e)
    })
})

getBook().then(data => {
    book.innerHTML = '';
    //run the forloop in print
    // console.log(data.books);
    printData(data.books);
}).catch(e => {
    // console.log(e)
})

//scroll
const body = document.querySelector('body');
const height = document.body.clientHeight;
console.log(height);
window.addEventListener('scroll', () => {
    const height = document.body.clientHeight;
    scrollBar.style.width = `${((window.pageYOffset)/height)*110}%`
})
