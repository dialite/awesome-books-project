/* book template structure */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Data {
  static getLocalStorage() {
    let allBooks;
    if (localStorage.getItem('allBooks') === null) {
      allBooks = [];
    } else {
      allBooks = JSON.parse(localStorage.getItem('allBooks'));
    }
    return allBooks;
  }

  static setLocalStorage(book) {
    const allBooks = Data.getLocalStorage();
    allBooks.push(book);
    localStorage.setItem('allBooks', JSON.stringify(allBooks));
  }

  static removeLocalStorage(author) {
    const allBooks = Data.getLocalStorage();

    allBooks.forEach((book, index) => {
      if (book.author === author) {
        allBooks.splice(index, 1);
      }
    });

    localStorage.setItem('allBooks', JSON.stringify(allBooks));
  }
}

class Actions {
  static display() {
    const books = Data.getLocalStorage();

    books.forEach((book) => Actions.addBook(book));
  }

  static addBook(book) {
    if (book.title !== undefined) {
      const list = document.querySelector('#book-list');
      const newRow = document.createElement('tr');

      newRow.innerHTML = `
      <li>"${book.title}"</li>
      <li>${'by'}</li>
      <li>${book.author}</li>
      <button class="remove">Remove</button>
      `;

      list.appendChild(newRow);
    }
  }

  static removeBook(element) {
    if (element.classList.contains('remove')) {
      element.parentElement.remove();
    }
  }

  static clearValues() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', Actions.display);

document.querySelector('#add').addEventListener('click', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author);
  Actions.addBook(book);
  Data.setLocalStorage(book);
  Actions.clearValues();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  Actions.removeBook(e.target);
  Data.removeLocalStorage(e.target.previousElementSibling.textContent);
});