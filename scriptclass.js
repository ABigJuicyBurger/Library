const bookTitleInput = document.querySelector("#title"); // what if element changes?
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead =
  document.querySelector("#read"); /* change immediately with fn f2 */

// Refactor code to use class instead of prototype

// Refactoring Book from constructor to a class with a  constructor and methods
class Book {
  constructor(title, author, pages, read, library) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.library = library;
  }

  info() {
    // if (this.read === read) {
    //   return `${title} by ${author}, ${pages} pages, read`;
    // } else {
    //   return `${title} by ${author}, ${pages} pages, not read yet`;
    // }
    const cover = `${this.title} by ${this.author}, ${this.pages} pages`; /* this is a statemtn */ // the return is the statement (full line of code), expression is couple words in the code, so in ternary is an experession and each part of ternary is also an expressioon
    return this.read === true ? cover + `read` : cover + `not read yet`; // DRY Code fixed, this is abstracted or deduplicated
  }

  setIndex(index) {
    this.bookCard.dataset.index = index;
  }

  //   toggleRead() {
  //     this.read = !this.read;
  //     return this.read;
  //   }

  get isRead() {
    return this.read;
  }

  set isRead(readStatus) {
    this.read = Boolean(readStatus);
  }

  addBooktoLibrary() {
    /* this is currently inside a book; the book has the power to add itself to a library, but which library? */
    this.library.myLibrary.push(this);
  }

  display(container) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const titleP = document.createElement("p"); // Here it can be changed to just template literal + HTML
    titleP.textContent = `Title: ${this.title}`;

    const authorP = document.createElement("p");
    authorP.textContent = `Author: ${this.author}`;

    const pagesP = document.createElement("p");
    pagesP.textContent = `Pages: ${this.pages}`;

    const readP = document.createElement("button");
    readP.classList.add("read-button");
    readP.textContent = `Read: ${this.read ? "Yes" : "No"}`;

    readP.addEventListener("click", () => {
      this.isRead = !this.isRead;
      const newReadStatus = this.isRead;
      readP.textContent = `Read: ${newReadStatus ? "Yes" : "No"}`;
      if (this.isRead) {
        readP.style.backgroundColor = "forestgreen";
      } else {
        readP.style.backgroundColor = "red";
      }
      readP.classList.toggle("read-button");
    });

    const removeBookBtn = document.createElement("button");
    removeBookBtn.classList.add("remove-button");
    removeBookBtn.textContent = "Remove";

    removeBookBtn.addEventListener("click", () => {
      if (bookCard) {
        const index = bookCard.dataset.index;
        this.library.myLibrary.splice(index, 1);
        container.remove;
        this.library.displayBooks();
      }
    });
    bookCard.appendChild(titleP);
    bookCard.appendChild(authorP);
    bookCard.appendChild(pagesP);
    bookCard.appendChild(readP);
    bookCard.appendChild(removeBookBtn);

    this.bookCard = bookCard;

    container.appendChild(bookCard);
  }
}

// make each class separate js files, scriptclass doesnt tell anyone working on code much

class Library {
  constructor() {
    this.myLibrary = []; // name change, can be books or bookshelf in order to change name confusion and a way to improve readability
    console.log(this.myLibrary);

    this.addBookBtn = document.querySelector("#addBookBtn");
    this.dialog = document.querySelector("#showBookDialog");
    this.bookList = document.querySelector("#bookList");
    this.saveBook = document.querySelector("#saveBook");

    this.initEventListeners();
  }

  initEventListeners() {
    this.addBookBtn.addEventListener("click", () => this.showDialog());
    this.saveBook.addEventListener("click", (e) => this.handleSaveBook(e));
  }

  showDialog() {
    this.dialog.showModal();
    console.log("add book button clicked");
  }

  handleSaveBook(
    e /* can pass book info as argument to keep code modular; fancy term is dependency injection*/
  ) {
    /* can change to arrow fnxn (which dont have own scope), which will take this to the library scope*/
    e.preventDefault();
    const newBook = new Book(
      /* here a new book is created from user input, and we're grabbing data from html elements directly*/ bookTitleInput.value,
      bookAuthor.value,
      bookPages.value,
      bookRead.checked,
      this /* means the local scope, inside this fnxn */
    );
    newBook.addBooktoLibrary(); /* think real world; does book add itself to library to does library add books to itself, this may be complicated with multiple libraries */
    this.displayBooks();
    this.dialog.close();
    this.resetDialogFields();
  }

  displayBooks() {
    this.bookList.textContent = "";
    this.myLibrary.forEach((book, index) => {
      book.display(this.bookList);
      book.setIndex(index);
    });
  }

  resetDialogFields() {
    bookTitleInput.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookRead.checked = false;
  }
}

const library1 = new Library();
// const library2

// if you want a more modular book, pass library in so you can make separate libraries
