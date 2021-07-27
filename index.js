bookZero = new Book("Think and Grow Rich","Napoleon Hill", 276, "yes")

bookOne = new Book("The Master Key System","Charles Haanel", 140, "no")

let myLibrary = [bookZero];

const library = document.querySelector("#library");

const addBookBtn = document.querySelector("#addBook");

addBookBtn.addEventListener("click", addBookBtn.setAttribute("class", "form"))


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    Book.prototype.info = function () {
        return `${title}, ${author}, ${pages} pages, ${(read == "yes")? "has been read" : "has not been read"}`
        }
}


function addBook(...libro) {
    myLibrary.push(...libro);
    showBook(libro);
};

function showBook(libro) {
    let book = document.createElement("div");
    let title = document.createElement("title");
    let author = document.createElement("author");
    let pages = document.createElement("pages");
    let read = document.createElement("read");
    book.setAttribute("id",`book-${myLibrary.length}`);
    book.setAttribute("class", "book");
    title.textContent = myLibrary[myLibrary.length -1].title;
    author.textContent = myLibrary[myLibrary.length -1].author;
    pages.textContent = myLibrary[myLibrary.length -1].pages;
    read.textContent = myLibrary[myLibrary.length -1].read;
    library.appendChild(book);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
}

function showLibrary() {
    for (let count = 0; count < myLibrary.length; count++) {
        showBook();
    }
};

showLibrary();

addBook(bookOne)


console.table(myLibrary)

console.log(bookOne.info())

