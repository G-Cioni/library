let myLibrary = [bookOne, bookTwo];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    Book.prototype.info = function () {
        return `${title}, ${author}, ${pages} pages, ${(read == "yes")? "has been read" : "has not been read"}`
        }
}


function addBookToLibrary(book) {
    myLibrary.push(book);
};

function showBook() {
    for (let i = 0; i < myLibrary.length; i++) {
        let book = document.createElement("div");
        let body = document.querySelector("#container");
        book.setAttribute("id",`book-${i}`);
        book.setAttribute("class", "book");
        body.appendChild(book);
    }
};


bookOne = new Book("Think and Grow Rich","Napoleon Hill", 276, "yes")

bookTwo = new Book("The Master Key System","Charles Haanel", 140, "no")


console.table(bookOne)

console.log(bookOne.info())

