/* book template structure */
function Book(title, author) {
  this.title = title;
  this.author = author;
}

/* function to create a book */
function addBook(book) {
  if (book.title !== undefined) {
    const list = document.querySelector('#book-list');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <button class="remove">Remove</button>
    <hr>
    `;

    list.appendChild(newRow);
  }
}

/* function to remove a book */
function removeBook(element) {
  if (element.classList.contains('remove')) {
    element.parentElement.remove();
  }
}

function clearValues() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
}

/* function to get the data from local storage */
function getLocalStorage() {
  let allBooks;
  if (localStorage.getItem('allBooks') === null) {
    allBooks = [];
  } else {
    allBooks = JSON.parse(localStorage.getItem('allBooks'));
  }
  return allBooks;
}

function setLocalStorage(book) {
  const allBooks = getLocalStorage();
  allBooks.push(book);
  localStorage.setItem('allBooks', JSON.stringify(allBooks));
}

/* function to remove book from local storage */
function removeLocalStorage(author) {
  const allBooks = getLocalStorage();

  allBooks.forEach((book, index) => {
    if (book.author === author) {
      allBooks.splice(index, 1);
    }
  });

  localStorage.setItem('allBooks', JSON.stringify(allBooks));
}

const booksArray = getLocalStorage();

const books = booksArray;

books.forEach((book) => addBook(book));

document.addEventListener('DOMContentLoaded', addBook);

document.querySelector('#add').addEventListener('click', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author);
  addBook(book);
  clearValues();
  setLocalStorage(book);
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  removeBook(e.target);
  removeLocalStorage(e.target.previousElementSibling.textContent);
});