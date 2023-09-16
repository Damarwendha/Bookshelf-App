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

let { bookReaded, bookUnread } = myBooks;

renderReadedHTML();
renderUnreadHTML();

formELem.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputTitleElem.value;
  const writer = inputWriterElem.value;
  const year = inputYearElem.value;
  addBook(title, writer, year);
  if (checkboxElem.checked) {
    renderReadedHTML();
  } else {
    renderUnreadHTML();
  }
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
      ids: "readed",
      title: title,
      writer: writer,
      year: year,
    });
    rootReaded.innerHTML += outputReadedHTML(title, year, writer);
  } else {
    nothingTextUnread.remove();
    bookUnread.push({
      ids: "unread",
      title: title,
      writer: writer,
      year: year,
    });
    rootUnread.innerHTML += outputUnreadHTML(title, year, writer);
  }
}

function renderReadedHTML() {
  rootReaded.innerHTML = "";
  bookReaded.forEach((obj, i) => {
    const { title, year, writer } = obj;
    rootReaded.innerHTML += outputReadedHTML(title, year, writer, i);
  });
  if (bookReaded == 0) {
    rootReaded.innerHTML =
      '<p class="nothing-unread">You have nothing in this shelf</p>';
  }
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
}
function renderUnreadHTML() {
  rootUnread.innerHTML = "";
  bookUnread.forEach((obj, i) => {
    const { title, year, writer } = obj;
    rootUnread.innerHTML += outputUnreadHTML(title, year, writer, i);
  });
  if (bookUnread == 0) {
    rootUnread.innerHTML =
      '<p class="nothing-unread">You have nothing in this shelf</p>';
  }
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
}

function deleteReadedBook(i) {
  bookReaded.splice(i, 1);
  renderReadedHTML(i);
}

function deleteUnreadBook(i) {
  bookUnread.splice(i, 1);
  renderUnreadHTML(i);
}

function outputReadedHTML(a, b, c, i) {
  return `
  <div class="not-readed-output-container">
        <div class="not-readed-output-left">
          <h4>${a}<h4>(${b})</h4></h4>
          <h6 class="writer-text">${c}</h6>
        </div>
        <div class="not-readed-icons">
          <img src="image/icons8-undo-30.png" alt="undo" class="undo-image" onclick="moveToUnread(${i})">
          <img src="image/icons8-delete-64.png" alt="delete" class="trash-image" onclick="deleteReadedBook(${i})">
        </div>
      </div>
  `;
}

function outputUnreadHTML(a, b, c, i) {
  return `
  <div class="not-readed-output-container">
        <div class="not-readed-output-left">
          <h4>${a}<h4>(${b})</h4></h4>
          <h6 class="writer-text">${c}</h6>
        </div>
        <div class="not-readed-icons">
          <img src="image/icons8-checked-50.png" alt="checked" class="check-image" onclick="moveToReaded(${i})">
          <img src="image/icons8-delete-64.png" alt="delete" class="trash-image" onclick="deleteUnreadBook(${i})">
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
