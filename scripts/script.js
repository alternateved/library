const popupButton = document.querySelector("#plus-button");
const closeButton = document.querySelector(".close");
const popup = document.querySelector("#popup");
const form = document.querySelector(".form-content");
const shelf = document.querySelector("#shelf");

let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary () {
  const bookTitle = form.elements["title"].value;
  const bookAuthor = form.elements["author"].value;
  const bookPages = form.elements["pages"].value;
  const bookRead = form.elements["read"].checked;
  
  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  
  myLibrary.push(newBook);
}

function displayShelf () {
  pass;
}

function renderBook(data) {
    const book = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("span");
    const pages = document.createElement("span");
    const read = document.createElement("span");

    title.textContent = data.title;
    author.textContent = data.author;
    pages.textContent = `Number of pages: ${data.pages}`;
    
    if (data.read) {
      read.textContent = "Book was devoured."
    } else {
      read.textContent = "Book was not devoured."
    }

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);

    book.classList.add("book");
    shelf.appendChild(book);

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
  form.addEventListener('submit', event => {
    addBookToLibrary();
    closePopupForm();
    form.reset();
    event.preventDefault()
  });
}

const bookOne = new Book("Harry Potter I", "J.K. Rowling", "200", true);
myLibrary.push(bookOne);
const bookTwo = new Book("Harry Potter II", "J.K. Rowling", "223", true);
myLibrary.push(bookTwo);
const bookThree = new Book("The Hobbit", "J.R.R. Tolkien", "300", true);
myLibrary.push(bookThree);

popupFunctionality();
renderBook(bookOne);