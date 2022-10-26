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

const date = new Date();
const currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
const currentTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
const dateTime = currentDate + ' ' + currentTime;
document.getElementById('date').innerHTML = dateTime;

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

const addNew = document.getElementById('books');
const list = document.getElementById('newBooks');
const title = document.getElementById('titleSection');
const contact = document.getElementById('contactSection');
const nav = document.getElementById('nav');
const links = nav.getElementsByClassName('link');

document.querySelector('#addNew').addEventListener('click', () => {
  addNew.classList = 'active';
  list.classList = 'active';
  title.classList = 'active';
  contact.classList.remove('active');
});

document.querySelector('#list').addEventListener('click', () => {
  addNew.classList.remove('active');
  list.classList.remove('active');
  title.classList.remove('active');
  contact.classList.remove('active');
});

document.querySelector('#contact').addEventListener('click', () => {
  addNew.classList.remove('active');
  list.classList = 'active';
  title.classList = 'active';
  contact.classList = ('active');
});

for (let i = 0; i < links.length; i += 1) {
  links[i].addEventListener('click', function () {
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}