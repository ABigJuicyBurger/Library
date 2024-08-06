const myLibrary = [];

const addBookBtn = document.querySelector("#addBookBtn");
removeBookBtn = document.querySelector("#removeBookBtn");
const dialog = document.querySelector("#showBookDialog");
const bookList = document.querySelector("#bookList");

const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");

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

  this.display = function (container) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const titleP = document.createElement("p");
    titleP.textContent = `Title: ${this.title}`;

    const authorP = document.createElement("p");
    authorP.textContent = `Author: ${this.author}`;

    const pagesP = document.createElement("p");
    pagesP.textContent = `Pages: ${this.pages}`;

    const readP = document.createElement("button");
    readP.classList.add("read-button");
    readP.textContent = `Read: ${this.read ? "Yes" : "No"}`;

    readP.addEventListener("click", () => {
      const newReadStatus = this.toggleRead();
      readP.textContent = `Read: ${newReadStatus ? "Yes" : "No"}`;
      readP.classList.toggle("read-button");
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");

    bookCard.appendChild(titleP);
    bookCard.appendChild(authorP);
    bookCard.appendChild(pagesP);
    bookCard.appendChild(readP);
    bookCard.appendChild(removeButton);

    this.bookCard = bookCard;

    container.appendChild(bookCard);
  };

  console.log(this.info());
}

Book.prototype.setIndex = function (index) {
  this.bookCard.dataset.index = index;
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
  return this.read;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
  console.log("add book button clicked");
});

saveBook.addEventListener("click", (e) => {
  e.preventDefault();
  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );
  addBookToLibrary(newBook);
  displayBooks();
  dialog.close();
  resetDialogFields();
});

function isthereBookCard() {
  const bookCard = document.querySelector(".book-card");
  if (!bookCard) {
    removeBookBtn.style.display = "none";
    return false;
  }

}

removeBookBtn.addEventListener("click", () => {
  if (bookCard) {
    const index = bookCard.dataset.index;
    myLibrary.splice(index, 1);
    bookCard.remove();
    displayBooks();
  }
});


function displayBooks() {
  bookList.textContent = "";
  myLibrary.forEach((book, index) => {
    book.display(bookList);
    book.setIndex(index);
  });
}

function resetDialogFields() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

displayBooks();
