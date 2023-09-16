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

renderReadedHTML();
renderUnreadHTML();

formELem.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputTitleElem.value;
  const writer = inputWriterElem.value;
  const year = inputYearElem.value;
  addBook(title, writer, year);
  renderReadedHTML();
  renderUnreadHTML();
  deleteBook();
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
    renderReadedHTML();
  } else {
    nothingTextUnread.remove();
    bookUnread.push({
      id: +new Date(),
      title: title,
      writer: writer,
      year: year,
      isComplete: false,
    });
    renderUnreadHTML();
  }
}

renderReadedHTML();
function renderReadedHTML() {
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
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
}

renderUnreadHTML();
function renderUnreadHTML() {
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
}

deleteBook();
function deleteBook(){
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
      } else {
        bookUnread.splice(unreadIndex, 1);
        console.log(bookUnread);
        console.log(myBooks.bookUnread);
        document.querySelector(`.unread-output-container-${id}`).remove();
        localStorage.setItem("myBooks", JSON.stringify(myBooks));
      }
    });
  }
}

function outputReadedHTML(a, b, c, id, isComplete) {
  return `
  <div class="readed-output-container readed-output-container-${id}">
        <div class="not-readed-output-left">
          <h4>${a}<h4>(${b})</h4></h4>
          <h6 class="writer-text">${c}</h6>
        </div>
        <div class="not-readed-icons">
          <img src="image/icons8-undo-30.png" alt="undo" class="undo-image">
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
          <img src="image/icons8-checked-50.png" alt="checked" class="check-image">
          <img src="image/icons8-delete-64.png" alt="delete" class="trash-image" data-id="${id}" data-is-complete="${isComplete}">
        </div>
      </div>
  `;
}

function moveToReaded(i) {
  bookReaded.push(bookUnread[i]);
  renderReadedHTML(i);
  deleteUnreadBook(i);
}
function moveToUnread(i) {
  bookUnread.push(bookReaded[i]);
  renderUnreadHTML(i);
  deleteReadedBook(i);
}

function ifBookEmpty() {
  if (bookReaded == 0) {
    return (rootReaded.innerHTML =
      '<p class="nothing-unread">You have nothing in this shelf</p>');
  }
}
