function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    Book.prototype.info = function () {
        return `${title}, ${author}, ${pages} pages, ${(read == "yes")? "has been read" : "has not been read"}`
        }
}

bookOne = new Book("Think and Grow Rich","Napoleon Hill", 276, "yes")

console.table(bookOne)

console.log(bookOne.info())

