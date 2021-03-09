"use strict";

const popupButton = document.querySelector("#plus-button");
const closeButton = document.querySelector(".close");
const popup = document.querySelector("#popup");
const form = document.querySelector(".form-content");
const shelf = document.querySelector("#shelf");
const stats = document.querySelectorAll(".statistics");

let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// function that checks localStorage for myLibrary array
function checkStorage() {
  if(localStorage.getItem("myLibrary")) {
    const storageLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    myLibrary = storageLibrary;
    displayShelf();
    displayStatistics();
  } else {
    displayShelf();
    displayStatistics();
  }
}

// function that gathers all information from submitted form and pushes new book on shelf
function addBookToLibrary() {
  const bookTitle = form.elements["title"].value;
  const bookAuthor = form.elements["author"].value;
  const bookPages = form.elements["pages"].value;
  const bookRead = form.elements["read"].checked;

  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

  myLibrary.push(newBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
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
  const removeButton = document.createElement("button");

  book.classList.add("book");

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

  read.addEventListener("change", updateReadStatus);

  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");
  removeButton.addEventListener("click", updateBooks);

  book.appendChild(title);
  book.appendChild(author);
  book.appendChild(pages);
  readContainer.appendChild(readInformation);
  readContainer.appendChild(read);
  book.appendChild(readContainer);
  book.appendChild(removeButton);

  shelf.appendChild(book);
}

//function that checks for changes in read status of added books and updates it accordingly
function updateReadStatus(event) {
      
      let bookNode = event.target.parentNode.parentNode;
      let keyTitle = bookNode.querySelector("h3");

      let targetIndex = myLibrary.findIndex(
        (book) => book.title === keyTitle.textContent
      );
      myLibrary[targetIndex].read = event.target.checked;

      displayStatistics();
}

// function that dynamically updates library whenever element is removed
function updateBooks(event) {

      let bookNode = event.target.parentNode.parentNode;
      let keyTitle = bookNode.querySelector("h3");

      let targetIndex = myLibrary.findIndex(
        (book) => book.title === keyTitle.textContent
      );
      myLibrary.splice(targetIndex, 1);

      displayStatistics();
      displayShelf();
}

// function which iterates through myLibrary and returns statistics array
function countStatistics() {
  let booksRead = myLibrary.reduce((total, book) => {
    if (book.read) total++;
    return total;
  }, 0);

  let booksUnread = myLibrary.reduce((total, book) => {
    if (!book.read) total++;
    return total;
  }, 0);

  let allBooks = myLibrary.length;

  return [booksRead, booksUnread, allBooks];
}

// function which renders statistics
function displayStatistics() {
  let statisticsArray = countStatistics();

  for (let i = 0; i < statisticsArray.length; i++) {
    stats[i].textContent =
      stats[i].textContent.slice(0, -1) + statisticsArray[i];
  }
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
    displayStatistics();
    form.reset();
    event.preventDefault();
  });
}

function main() {
  const bookOne = new Book("Philosophical Investigations", "Ludwig Wittgenstein ", "256", true);
  myLibrary.push(bookOne);
  const bookTwo = new Book("Molloy", "Samuel Beckett", "256", false);
  myLibrary.push(bookTwo);
  const bookThree = new Book("Walden", "Henry David Thoreau", "226", true);
  myLibrary.push(bookThree);
  
  popupFunctionality();
  checkStorage();
  displayShelf();
  displayStatistics();
}

main();
