bookZero = new Book('Think and Grow Rich', 'Napoleon Hill', 276, 'yes');

bookOne = new Book('The Master Key System', 'Charles Haanel', 140, 'no');

let myLibrary = [bookZero];

const library = document.querySelector('#library');

const newBookBtn = document.querySelector('#addBook');

newBookBtn.addEventListener('click', () => createForm());

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	Book.prototype.info = function () {
		return `${title}, ${author}, ${pages} pages, ${
			read == 'yes' ? 'has been read' : 'has not been read'
		}`;
	};
}

function addBook(...libro) {
	myLibrary.push(...libro);
	showBook(libro);
}

function showBook() {
	let book = document.createElement('div');
	book.setAttribute('id', `book-${myLibrary.length}`);
	book.setAttribute('class', 'book');

	let title = document.createElement('div');
	title.setAttribute('class', 'title');

	let author = document.createElement('div');
	author.setAttribute('class', 'author');

	let pages = document.createElement('div');
	pages.setAttribute('class', 'pages');

	let read = document.createElement('div');
	read.setAttribute('class', 'read');

	title.textContent = myLibrary[myLibrary.length - 1].title;
	author.textContent = myLibrary[myLibrary.length - 1].author;
	pages.textContent = myLibrary[myLibrary.length - 1].pages;
	read.textContent = myLibrary[myLibrary.length - 1].read;

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
}

function createForm() {
	let body = document.querySelector('body');

	let form = document.createElement('div');
	form.setAttribute('class', 'form');

	let title = document.createElement('input');
	title.setAttribute('class', 'title');
	form.appendChild(title);

	let author = document.createElement('input');
	author.setAttribute('class', 'author');
	form.appendChild(author);

	let pages = document.createElement('input');
	pages.setAttribute('class', 'pages');
	form.appendChild(pages);

	let read = document.createElement('input');
	read.setAttribute('class', 'read');
	form.appendChild(read);

	body.appendChild(form);
}

showLibrary();

addBook(bookOne);

console.table(myLibrary);

console.log(bookOne.info());
