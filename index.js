bookZero = new Book('Think and Grow Rich', 'Napoleon Hill', 276, 'Yes');

bookOne = new Book('The Master Key System', 'Charles Haanel', 140, 'No');

bookTwo = new Book('1984', 'george Orwell', 234, 'Yes');

let myLibrary = [];

let formPopup = document.querySelector('#formPopup');

const submitBtn = document.querySelector('#submit');

const library = document.querySelector('#library');

const newBookBtn = document.querySelector('#addBook');

newBookBtn.addEventListener('click', () => openForm());

submitBtn.addEventListener('click', () => submitForm());

const errors = document.querySelector('#errors');

let newTitle = document.querySelector('#title');
let newAuthor = document.querySelector('#author');
let newPages = document.querySelector('#pages');
let newRead = document.querySelector('#read');

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = function () {
	return `${title}, ${author}, ${pages} pages, ${
		read == 'yes' ? 'has been read' : 'has not been read'
	}`;
};

Book.prototype.toggleRead = function () {
	if (this.read === 'Yes') {
		this.read = 'No';
	} else {
		this.read = 'Yes';
	}
};

function addBook(...book) {
	myLibrary.push(...book);
	showBook(book);
}

function showBook() {
	let book = document.createElement('div');
	book.setAttribute('id', `book-${myLibrary.length}`);
	book.setAttribute('class', 'book');

	let title = document.createElement('div');
	title.setAttribute('class', 'formItem');

	let author = document.createElement('div');
	author.setAttribute('class', 'formItem');

	let pages = document.createElement('div');
	pages.setAttribute('class', 'formItem');

	let read = document.createElement('div');
	read.setAttribute('class', 'formItem');

	let remove = document.createElement('button');
	remove.setAttribute('id', `${myLibrary.length}`);
	remove.addEventListener('click', () => removeBook());

	let toggleReadBtn = document.createElement('button');
	toggleReadBtn.setAttribute('id', `${myLibrary.length}`);
	toggleReadBtn.addEventListener('click', () => toggleReadBtnFunc());

	title.textContent = `Title: ${myLibrary[myLibrary.length - 1].title}`;
	author.textContent = `Author: ${myLibrary[myLibrary.length - 1].author}`;
	pages.textContent = `Length: ${myLibrary[myLibrary.length - 1].pages} pages`;
	read.textContent = `Finished reading?: ${
		myLibrary[myLibrary.length - 1].read
	}`;
	remove.textContent = 'Remove Book';
	toggleReadBtn.textContent = 'Read';

	library.appendChild(book);
	book.appendChild(title);
	book.appendChild(author);
	book.appendChild(pages);
	book.appendChild(read);
	book.appendChild(remove);
	book.appendChild(toggleReadBtn);
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

function verifyFormErrors() {
	errors.textContent = '';
	errorList = ['Please insert: '];
	switch (true) {
		case newTitle.value == '':
			errorList.push('Title');
		case newAuthor.value == '':
			errorList.push('Author');
		case newTitle.value == '':
			errorList.push('Number of Pages');
	}
	errors.textContent = errorList.join(' | ');
	console.log(errors);
	if (errorList[1] === undefined) {
		return true;
	} else {
		return false;
	}
}
function submitForm() {
	if (verifyFormErrors() === true) {
		let newBook = new Book(
			newTitle.value,
			newAuthor.value,
			newPages.value,
			newRead.value
		);
		myLibrary.push(newBook);
		newTitle.value = '';
		newAuthor.value = '';
		newPages.value = '';
		newRead.value = '';
		closeForm();
		showBook();
	}
}

function removeBook() {
	let id = event.srcElement.id;
	let button = document.getElementById(id);
	delete myLibrary[id - 1];
	button.parentElement.remove();
	console.table(myLibrary);
}

function toggleReadBtnFunc() {
	let id = event.srcElement.id;
	myLibrary[id - 1].toggleRead();
	console.table(myLibrary);
}

showLibrary();

addBook(bookZero);
addBook(bookOne);
addBook(bookTwo);

console.table(myLibrary);
