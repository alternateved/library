const popupButton = document.querySelector("#plus-button");
const closeButton = document.querySelector(".close");
const popup = document.querySelector("#popup");
const form = document.querySelector(".form-content");

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



popupFunctionality();