const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");

// Refactor code to use class instead of prototype

// Refactoring Book from constructor to a class with a  constructor and methods
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.library = library
  }

  info() {
    if (this.read === read) {
      return `${title} by ${author}, ${pages} pages, read`;
    } else {
      return `${title} by ${author}, ${pages} pages, not read yet`;
    }
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
    this.library.myLibrary.push(this);
  }

  display(container) {
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
        this.myLibrary.splice(index, 1);
        container.remove;
        displayBooks();
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

class Library {
  constructor() {
    this.myLibrary = [];
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

  handleSaveBook(e) {
    e.preventDefault();
    const newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookRead.checked,
      this
    );
    newBook.addBooktoLibrary();
    this.displayBooks();
    this.dialog.close();
    this.resetDialogFields();
  }

  displayBooks() {
    bookList.textContent = "";
    this.myLibrary.forEach((book, index) => {
      book.display(bookList);
      book.setIndex(index);
    });
  }

  resetDialogFields() {
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
  }
}

const library = new Library();
