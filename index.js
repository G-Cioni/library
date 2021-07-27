// Create dummy books
bookZero = new Book('Think and Grow Rich', 'Napoleon Hill', 276, 'Yes');

bookOne = new Book('The Master Key System', 'Charles Haanel', 140, 'No');

bookTwo = new Book('1984', 'george Orwell', 234, 'Yes');

// Create some const for DOM manipulation
const submitBtn = document.querySelector('#submit');

const library = document.querySelector('#library');

const newBookBtn = document.querySelector('#addBook');

const errors = document.querySelector('#errors');

newBookBtn.addEventListener('click', () => openForm());

submitBtn.addEventListener('click', () => submitForm());

// Create empty library
let myLibrary = [];

// Creating variables for Form DOM manipulation
let formPopup = document.querySelector('#formPopup');
let newTitle = document.querySelector('#title');
let newAuthor = document.querySelector('#author');
let newPages = document.querySelector('#pages');
let newRead = document.querySelector('#read');

// Create new book constructor
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

// Added info() to Book prototype
Book.prototype.info = function () {
	return `${title}, ${author}, ${pages} pages, ${
		read == 'yes' ? 'has been read' : 'has not been read'
	}`;
};

// Added toggleRead() to Book prototype
Book.prototype.toggleRead = function () {
	if (this.read === 'Yes') {
		this.read = 'No';
	} else {
		this.read = 'Yes';
	}
};

// Creates html for a new book
function showBook() {
	// Create new html elements for a new Book
	let book = document.createElement('div');
	book.setAttribute('id', `${myLibrary.length}`);
	book.setAttribute('class', 'book');

	let title = document.createElement('div');
	title.setAttribute('data-title', `${myLibrary.length}`);
	title.setAttribute('class', 'formItem');

	let author = document.createElement('div');
	author.setAttribute('data-author', `${myLibrary.length}`);
	author.setAttribute('class', 'formItem');

	let pages = document.createElement('div');
	pages.setAttribute('data-pages', `${myLibrary.length}`);
	pages.setAttribute('class', 'formItem');

	let read = document.createElement('div');
	read.setAttribute('data-read', `${myLibrary.length}`);
	read.setAttribute('class', 'formItem');

	let lowerButtons = document.createElement('div');
	lowerButtons.setAttribute('data-lower-buttons', `${myLibrary.length}`);

	let remove = document.createElement('button');
	remove.setAttribute('data-remove', `${myLibrary.length}`);
	remove.addEventListener('click', () => removeBook());

	let toggleReadBtn = document.createElement('button');
	toggleReadBtn.setAttribute('data-toggle', `${myLibrary.length}`);
	toggleReadBtn.addEventListener('click', () => toggleRead());

	// Insert text content based on user input
	title.textContent = `Title: ${myLibrary[myLibrary.length - 1].title}`;
	author.textContent = `Author: ${myLibrary[myLibrary.length - 1].author}`;
	pages.textContent = `Length: ${myLibrary[myLibrary.length - 1].pages} pages`;
	read.textContent = `Finished reading?: ${
		myLibrary[myLibrary.length - 1].read
	}`;
	remove.textContent = 'Remove Book';
	toggleReadBtn.textContent = 'Read';

	// Add everything that was just created to DOM
	library.appendChild(book);
	book.appendChild(title);
	book.appendChild(author);
	book.appendChild(pages);
	book.appendChild(read);
	book.appendChild(lowerButtons);
	lowerButtons.appendChild(remove);
	lowerButtons.appendChild(toggleReadBtn);
}

// Adds a new book to the library and runs showBook function (creates html for new book)
function addBook(...book) {
	myLibrary.push(...book);
	showBook(book);
}
// Runs through the current library and creates neccessary html
function showLibrary() {
	for (let count = 0; count < myLibrary.length; count++) {
		showBook();
	}
}

// Removes the book which is parent of the "Remove Book" button
function removeBook() {
	let dataRemove = event.target.getAttribute('data-remove');
	let book = document.getElementById(dataRemove);
	delete myLibrary[dataRemove - 1];
	book.remove();
}

// Toggles "Finished reading?" between "Yes" and "No"
function toggleRead() {
	let dataRead = event.target.getAttribute('data-toggle');
	myLibrary[dataRead - 1].toggleRead();
	document.querySelector(
		`[data-read="${dataRead}"]`
	).textContent = `Finished reading?: ${myLibrary[dataRead - 1].read}`;
}

// Opens form to add a new book to library
function openForm() {
	formPopup.style.display = 'block';
}

// Closes the form if it's open
function closeForm() {
	formPopup.style.display = 'none';
}

// Checks for errors when user submits form
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
	if (errorList[1] === undefined) {
		return true;
	} else {
		return false;
	}
}

// Submits form, closes it and adds book to library and DOM
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

// Shows initial library
showLibrary();

//Adds dummy books
addBook(bookZero);
addBook(bookOne);
addBook(bookTwo);
