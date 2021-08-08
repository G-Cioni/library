//  Book class
class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	toggleRead() {
		this.read === 'Yes' ? (this.read = 'No') : (this.read = 'Yes');
	}
}

// Create some const for DOM manipulation
const submitBtn = document.querySelector('#submit');

const library = document.querySelector('#library');

const newBookBtn = document.querySelector('#addBook');

const errors = document.querySelector('#errors');

newBookBtn.addEventListener('click', () => openForm());

submitBtn.addEventListener('click', () => submitForm());

// Creating variables for Form DOM manipulation
let formPopup = document.querySelector('#formPopup');
let newTitle = document.querySelector('#title');
let newAuthor = document.querySelector('#author');
let newPages = document.querySelector('#pages');
let newRead = document.querySelector('#read');

// Create empty library
let myLibrary = [];

// Save to localStorage
function localSet() {
	objSerial = JSON.stringify(myLibrary);
	localStorage.myLibrary = objSerial;
}

// Retrieve from local storage and recreate each book as an object with access to prototype
function localGet() {
	if (localStorage.myLibrary) {
		objDeserial = JSON.parse(localStorage.myLibrary);
		myLibrary = objDeserial.map(
			(book) => new Book(book.title, book.author, book.pages, book.read)
		);
	}
}

// Retrieve localStorage
localGet();

// Creates html for a new book
function showBook(i) {
	// Create new html elements and set attributes for a new Book
	let book = document.createElement('div');
	book.setAttribute('id', `${i + 1}`);
	book.setAttribute('class', 'book');

	let title = document.createElement('div');
	title.setAttribute('data-title', `${i + 1}}`);
	title.setAttribute('class', 'bookItem');

	let author = document.createElement('div');
	author.setAttribute('data-author', `${i + 1}`);
	author.setAttribute('class', 'bookItem');

	let pages = document.createElement('div');
	pages.setAttribute('data-pages', `${i + 1}`);
	pages.setAttribute('class', 'bookItem');

	let read = document.createElement('div');
	read.setAttribute('data-read', `${i + 1}`);
	read.setAttribute('class', 'bookItem');

	let lowerButtons = document.createElement('div');
	lowerButtons.setAttribute('data-lower-buttons', `${i + 1}`);

	let remove = document.createElement('button');
	remove.setAttribute('data-remove', `${i + 1}`);
	remove.setAttribute('class', 'fas fa-trash-alt');
	remove.addEventListener('click', () => removeBook());

	let toggleReadBtn = document.createElement('button');
	toggleReadBtn.setAttribute('data-toggle', `${i + 1}`);
	toggleReadBtn.setAttribute('class', 'fas fa-glasses');
	toggleReadBtn.addEventListener('click', () => toggleRead());

	// Insert text content based on user input
	title.textContent = `Title: ${myLibrary[i].title}`;
	author.textContent = `Author: ${myLibrary[i].author}`;
	pages.textContent = `Length: ${myLibrary[i].pages} pages`;
	read.textContent = `Read?: ${myLibrary[i].read}`;

	// Add everything that was just created to DOM
	library.prepend(book);
	book.appendChild(lowerButtons);
	lowerButtons.appendChild(toggleReadBtn);
	lowerButtons.appendChild(remove);
	book.appendChild(title);
	book.appendChild(author);
	book.appendChild(pages);
	book.appendChild(read);
}

// Runs through the current library and creates neccessary html
function showLibrary() {
	for (let count = 0; count < myLibrary.length; count++) {
		showBook(count);
	}
}

// Adds a new book to the library and runs showBook function (creates html for new book)
function addBook(...book) {
	myLibrary.push(...book);
	localSet();
	showBook(myLibrary.length);
}

// Removes the book which is parent of the "Remove Book" button
function removeBook() {
	let dataRemove = event.target.getAttribute('data-remove');
	let book = document.getElementById(dataRemove);
	myLibrary.splice(dataRemove - 1, 1);
	book.remove();
	fixHtmlBooks(dataRemove);
	localSet();
}

// makes sure html attributes are correct when removing books
function fixHtmlBooks(dataRemove) {
	books = document.querySelectorAll('.book');
	removeButtons = document.querySelectorAll('[data-remove]');
	books = [...books];
	removeButtons = [...removeButtons];
	books.map((book) => {
		if (book.id > dataRemove) {
			book.id -= 1;
		}
		removeButtons.map((button) => {
			if (button.dataset.remove > dataRemove) {
				button.dataset.remove -= 1;
			}
		});
	});
}

// Toggles "Finished reading?" between "Yes" and "No"
function toggleRead() {
	let dataRead = event.target.getAttribute('data-toggle');
	myLibrary[dataRead - 1].toggleRead();
	document.querySelector(`[data-read="${dataRead}"]`).textContent = `Read?: ${
		myLibrary[dataRead - 1].read
	}`;
	localSet();
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
	if (errorList[1]) {
		errors.textContent = errorList.join(' | ');
	}
	if (errorList[1] === undefined) {
		return true;
	} else {
		return false;
	}
}

// Submits form, closes it and adds book to library and DOM
function submitForm() {
	if (verifyFormErrors()) {
		let newBook = new Book(
			newTitle.value,
			newAuthor.value,
			newPages.value,
			newRead.value
		);
		addBook(newBook);
		newTitle.value = '';
		newAuthor.value = '';
		newPages.value = '';
		newRead.value = '';
		closeForm();
	}
}

// Shows initial library
showLibrary();
