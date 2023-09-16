const myBooks = JSON.parse(localStorage.getItem("myBooks")) || {
  bookReaded: [],
  bookUnread: [],
};

const formELem = document.querySelector(".top-container");
const saveElem = document.querySelector(".save-button");
const inputTitleElem = document.querySelector(".input-title");
const inputWriterElem = document.querySelector(".input-writer");
const inputYearElem = document.querySelector(".input-year");
const checkboxElem = document.querySelector(".input-checkbox");
const rootUnread = document.querySelector(".root-not-readed");
const rootReaded = document.querySelector(".root-readed");
const nothingTextUnread = document.querySelector(".nothing-unread");
const nothingTextReaded = document.querySelector(".nothing-readed");

const { bookReaded, bookUnread } = myBooks;

renderHTML();

formELem.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputTitleElem.value;
  const writer = inputWriterElem.value;
  const year = inputYearElem.value;
  addBook(title, writer, year);
  renderHTML();
  resetInput();
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
});

function resetInput() {
  inputTitleElem.value = "";
  inputWriterElem.value = "";
  inputYearElem.value = "";
  checkboxElem.checked = false;
}

function addBook(title, writer, year) {
  nothingTextReaded.remove();
  if (checkboxElem.checked) {
    bookReaded.push({
      id: +new Date(),
      title: title,
      writer: writer,
      year: year,
      isComplete: true,
    });
    renderHTML();
  } else {
    nothingTextUnread.remove();
    bookUnread.push({
      id: +new Date(),
      title: title,
      writer: writer,
      year: year,
      isComplete: false,
    });
    renderHTML();
  }
}

function renderHTML() {
  rootReaded.innerHTML = "";
  bookReaded.forEach((obj) => {
    rootReaded.innerHTML += outputReadedHTML(
      obj.title,
      obj.year,
      obj.writer,
      obj.id,
      obj.isComplete
    );
  });

  rootUnread.innerHTML = "";
  bookUnread.forEach((obj) => {
    rootUnread.innerHTML += outputUnreadHTML(
      obj.title,
      obj.year,
      obj.writer,
      obj.id,
      obj.isComplete
    );
  });
  if (bookUnread == 0) {
    rootUnread.innerHTML =
      '<p class="nothing-unread">You have nothing in this shelf</p>';
  }
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
  deleteBook();
  ifBookEmpty();
  changeShelf()
}

function deleteBook() {
  const deleteButtons = document.querySelectorAll(".trash-image");
  for (const each of deleteButtons) {
    each.addEventListener("click", () => {
      const id = each.getAttribute("data-id");
      const isComplete = each.getAttribute("data-is-complete");
      const unreadIndex = bookUnread.findIndex((obj) => obj.id == id);
      const readedIndex = bookReaded.findIndex((obj) => obj.id == id);
      if (isComplete === "true") {
        bookReaded.splice(readedIndex, 1);
        console.log(bookReaded);
        console.log(myBooks.bookReaded);
        document.querySelector(`.readed-output-container-${id}`).remove();
        localStorage.setItem("myBooks", JSON.stringify(myBooks));
        ifBookEmpty();
      } else {
        bookUnread.splice(unreadIndex, 1);
        console.log(bookUnread);
        console.log(myBooks.bookUnread);
        document.querySelector(`.unread-output-container-${id}`).remove();
        localStorage.setItem("myBooks", JSON.stringify(myBooks));
        ifBookEmpty();
      }
    });
  }
}

function moveToReaded() {
  document.querySelectorAll(".check-image").forEach((each, i) => {
    each.addEventListener("click", () => {
      const id = each.getAttribute("data-id");
      bookUnread[i].isComplete = "true";
      bookReaded.push(bookUnread[i]);
      bookUnread.splice(i, 1);
      document.querySelector(`.unread-output-container-${id}`).remove();
      renderHTML();
    });
  });
}

function moveToUnread(){
  document.querySelectorAll(".undo-image").forEach((each, i) => {
    each.addEventListener("click", () => {
      const id = each.getAttribute("data-id");
      bookReaded[i].isComplete = "false";
      bookUnread.push(bookReaded[i]);
      bookReaded.splice(i, 1);
      document.querySelector(`.readed-output-container-${id}`).remove();
      renderHTML();
    });
  });
}

function outputReadedHTML(a, b, c, id, isComplete) {
  return `
  <div class="readed-output-container readed-output-container-${id}">
        <div class="not-readed-output-left">
          <h4>${a}<h4>(${b})</h4></h4>
          <h6 class="writer-text">${c}</h6>
        </div>
        <div class="not-readed-icons">
          <img src="image/icons8-undo-30.png" alt="undo" class="undo-image" data-id="${id}">
          <img src="image/icons8-delete-64.png" alt="delete" class="trash-image" data-id="${id}" data-is-complete="${isComplete}">
        </div>
      </div>
  `;
}

function outputUnreadHTML(a, b, c, id, isComplete) {
  return `
  <div class="unread-output-container unread-output-container-${id}">
        <div class="not-readed-output-left">
          <h4>${a}<h4>(${b})</h4></h4>
          <h6 class="writer-text">${c}</h6>
        </div>
        <div class="not-readed-icons">
          <img src="image/icons8-checked-50.png" alt="checked" class="check-image" data-id="${id}">
          <img src="image/icons8-delete-64.png" alt="delete" class="trash-image" data-id="${id}" data-is-complete="${isComplete}">
        </div>
      </div>
  `;
}
function changeShelf(){
  moveToUnread();
  moveToReaded();
}


function ifBookEmpty() {
  ifReadedBookEmpty();
  ifUnreadBookEmpty();
}

function ifReadedBookEmpty() {
  if (myBooks.bookReaded.length == 0) {
    return (rootReaded.innerHTML =
      '<p class="nothing-unread">You have nothing in this shelf</p>');
  }
}

function ifUnreadBookEmpty() {
  if (myBooks.bookUnread.length == 0) {
    return (rootUnread.innerHTML =
      '<p class="nothing-unread">You have nothing in this shelf</p>');
  }
}
