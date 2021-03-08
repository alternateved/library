"use strict";

const popupButton = document.querySelector("#plus-button");
const closeButton = document.querySelector(".close");
const popup = document.querySelector("#popup");
const form = document.querySelector(".form-content");
const shelf = document.querySelector("#shelf");
const stats = document.querySelectorAll(".statisics");

let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// function that gathers all information from submitted form and pushes new book on shelf
function addBookToLibrary() {
  const bookTitle = form.elements["title"].value;
  const bookAuthor = form.elements["author"].value;
  const bookPages = form.elements["pages"].value;
  const bookRead = form.elements["read"].checked;

  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

  myLibrary.push(newBook);
}

// function that iterates through array of books and displays it on shelf
function displayShelf() {
  while (shelf.childElementCount > 0) {
    shelf.removeChild(shelf.firstElementChild);
  }
  myLibrary.forEach((book) => renderBook(book));
}

// function that creates book card and appends it to shelf
function renderBook(data) {
  const book = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("span");
  const pages = document.createElement("span");
  const readContainer = document.createElement("div");
  const readInformation = document.createElement("span");
  const read = document.createElement("input");

  title.textContent = data.title;
  author.textContent = `Author: ${data.author}`;
  pages.textContent = `Number of pages: ${data.pages}`;

  read.type = "checkbox";
  read.classList.add("switch");

  if (data.read) {
    readInformation.textContent = "Mark as unread: ";
    read.checked = true;
  } else {
    readInformation.textContent = "Mark as read: ";
    read.checked = false;
  }

  book.appendChild(title);
  book.appendChild(author);
  book.appendChild(pages);
  readContainer.appendChild(readInformation);
  readContainer.appendChild(read);
  book.appendChild(readContainer);

  book.classList.add("book");
  shelf.appendChild(book);
}

//function that checks for changes in read status of added books and updates it accordingly
function updateReadStatus() {
  const marks = document.querySelectorAll(".book > div > .switch");

  marks.forEach((mark) => {
    mark.addEventListener("change", (event) => {
      let bookNode = event.target.parentNode.parentNode;
      let keyTitle = bookNode.querySelector("h3");

      let targetIndex = myLibrary.findIndex(
        (book) => book.title === keyTitle.textContent
      );
      myLibrary[targetIndex].read = event.target.checked;
    });
  });
}

function countStatistics() {
  let booksRead = myLibrary.reduce((total, book) => {
    if(book.read) total ++;
    return total;
  }, 0);

  let booksUnread = myLibrary.reduce((total, book) => {
    if(!book.read) total ++;
    return total;
  }, 0);

  let allBooks = myLibrary.length;
}

function showPopupForm() {
  popup.style.display = "block";
}

function closePopupForm() {
  popup.style.display = "none";
}

// function to contain all EventListeners and calls regarding popup visibility
function popupFunctionality() {
  popupButton.addEventListener("click", showPopupForm);
  closeButton.addEventListener("click", closePopupForm);

  // when the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", (event) => {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  });
  // intercept submit event
  form.addEventListener("submit", (event) => {
    addBookToLibrary();
    closePopupForm();
    displayShelf();
    form.reset();
    event.preventDefault();
  });
}

const bookOne = new Book("Harry Potter I", "J.K. Rowling", "200", true);
myLibrary.push(bookOne);
const bookTwo = new Book("Harry Potter II", "J.K. Rowling", "223", true);
myLibrary.push(bookTwo);
const bookThree = new Book("The Hobbit", "J.R.R. Tolkien", "300", true);
myLibrary.push(bookThree);

popupFunctionality();
displayShelf();
updateReadStatus()
countStatistics()
