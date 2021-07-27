bookZero = new Book('Think and Grow Rich', 'Napoleon Hill', 276, 'yes');

bookOne = new Book('The Master Key System', 'Charles Haanel', 140, 'no');

let myLibrary = [bookZero];

let forPopup = document.querySelector('#formPopup');

const submitBtn = document.querySelector('#submit');

const library = document.querySelector('#library');

const newBookBtn = document.querySelector('#addBook');

newBookBtn.addEventListener('click', () => openForm());

submitBtn.addEventListener('click', () => submitForm());

let newTitle = document.querySelector('#title');
let newAuthor = document.querySelector('#author');
let newPages = document.querySelector('#pages');
let newRead = document.querySelector('#read');

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

function addBook(...book) {
	myLibrary.push(...book);
	showBook(book);
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

function openForm() {
	formPopup.style.display = 'block';
}

function closeForm() {
	formPopup.style.display = 'none';
}

function submitForm() {
	let newBook = new Book(
		newTitle.value,
		newAuthor.value,
		newPages.value,
		newRead.value
	);
	myLibrary.push(newBook);
	showBook();
}

showLibrary();

addBook(bookOne);

console.table(myLibrary);

console.log(bookOne.info());
