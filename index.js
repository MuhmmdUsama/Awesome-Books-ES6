import addToLocalStorage from './modules/addLocal.js';
import time from './modules/dateTime.js';

const bookInput = document.querySelector('.book-input');
const authorInput = document.querySelector('.author-input');
const submit = document.querySelector('.add');
const booksDiv = document.querySelector('.books');

// Empty Array to store the Book
let arrayOfBooks = [];

if (localStorage.getItem('books')) {
  arrayOfBooks = JSON.parse(localStorage.getItem('books'));
}

const addElementsToPage = ((arrayOfBooks) => {
  // Empty Tasks Div
  booksDiv.innerHTML = '';

  //  Looping On Array Of Tasks
  arrayOfBooks.forEach((task) => {
    const contactElement = ' By : ';
    // Creat Main Div
    const div = document.createElement('div');
    div.className = 'task mb-3';

    // Check If Task is Done
    if (task.completed) {
      div.className = 'task done';
    }
    div.setAttribute('data-id', task.id);
    div.appendChild(
      document.createTextNode(task.title + contactElement + task.author),
    );

    // Creat Delet button
    const span = document.createElement('span');
    span.className = 'del btn btn-danger ms-5';
    span.appendChild(document.createTextNode('Delet'));

    // Append Button to Main Div
    div.appendChild(span);

    // Add Task Div To Main
    booksDiv.appendChild(div);
  });
});

// Get Books To LocalStorage Function

const getFromLocalStorage = () => {
  const data = window.localStorage.getItem('books');
  if (data) {
    const books = JSON.parse(data);
    addElementsToPage(books);
  }
};

// Trigger Get Data From Local Storage Function
getFromLocalStorage();

class AddingBooks {
  static addTaskToArray(taskText, authorText) {
    // Task Data

    const task = {
      id: Date.now(),
      title: taskText,
      author: authorText,
      completed: false,
    };

    //   Push Task To Array of books

    arrayOfBooks.push(task);

    // Add Elements to Page

    addElementsToPage(arrayOfBooks);

    // Add books To Local Storage

    addToLocalStorage(arrayOfBooks);
  }
}

// add book
submit.onclick = () => {
  if ((bookInput.value && authorInput.value) !== '') {
    AddingBooks.addTaskToArray(bookInput.value, authorInput.value); // Add task to Array of Tasks
    bookInput.value = '';
    authorInput.value = '';
    bookInput.focus();
  }
};

const deletTaskWith = (taskId) => {
  arrayOfBooks = arrayOfBooks.filter((task) => (task.id !== taskId));
  addToLocalStorage(arrayOfBooks);
};

// Click on Task Element

booksDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    // Remove Element from Page
    e.target.parentElement.remove();

    // Remove Task From LocalStorage
    deletTaskWith(JSON.parse(e.target.parentElement.getAttribute('data-id')));
  }
});

// ################ Website Navigation ###################3

const navList = document.querySelector('#nav-list');
const navAddNew = document.querySelector('#nav-add-new');
const navContact = document.querySelector('#nav-contact');

const bookListSection = document.querySelector('.books-list');
const addNewSection = document.querySelector('.add-new-book');
const contactSection = document.querySelector('.add-contact-info');

navList.addEventListener('click', () => {
  bookListSection.classList.add('display-section');
  addNewSection.classList.remove('display-section');
  contactSection.classList.remove('display-section');
});

navAddNew.addEventListener('click', () => {
  bookListSection.classList.remove('display-section');
  addNewSection.classList.add('display-section');
  contactSection.classList.remove('display-section');
});

navContact.addEventListener('click', () => {
  bookListSection.classList.remove('display-section');
  addNewSection.classList.remove('display-section');
  contactSection.classList.add('display-section');
});

// ################ Current Time ################

time();

// ################ Mobile navbar ################

const hamburgerMenu = document.querySelector('.hamburger');
const navBar = document.querySelector('nav');
const navLinks = document.querySelectorAll('#nav-links li');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  navBar.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
    navBar.classList.remove('active');
  });
});
