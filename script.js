const myLibrary = ["Example Book 1", "Example Book 2"];
const addBookBtn = document.querySelector("#addBookBtn");
const dialog = document.querySelector("#addBookDialog");
const saveBook = document.querySelector("#saveBook");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    if (read === true) {
      return `${title} by ${author}, ${pages} pages, read`;
    } else {
      return `${title} by ${author}, ${pages} pages, not read yet`;
    }
  };
  console.log(this.info());
}

// TODO 1: make a function to add a book to the library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// TODO 2: write a function that loops through array and displays each book on the page
function displayBooks() {
  const bookList = document.querySelector("#bookList");
  bookList.textContent = "";
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = "<p>" + book + "</p>";
    bookList.appendChild(bookCard);
  });
}

// TODO 3: Use the addBook button in HTML to bring up a form allowing user to input details of book: title, author, pages and whether it's been read using dialog box
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});
