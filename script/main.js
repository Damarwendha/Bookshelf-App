const myBooks = JSON.parse(localStorage.getItem("myBooks")) || {
  bookReaded: [],
  bookUnread: [],
};

const { bookReaded, bookUnread } = myBooks;

renderHTML();

$(".top-container").on("submit", (e) => {
  e.preventDefault();
  const title = $(".input-title").val();
  const writer = $(".input-writer").val();
  const year = Number($(".input-year").val());
  addBook(title, writer, year);
  renderHTML();
  resetInput();
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
});

function resetInput() {
  $(".input-title").val("");
  $(".input-writer").val("");
  $(".input-year").val("");
  $(".input-checkbox").prop("checked", false);
}

function addBook(title, writer, year) {
  if ($(".input-checkbox").prop("checked")) {
    $(".nothing-readed").remove();
    bookReaded.push({
      id: +new Date(),
      title: title,
      writer: writer,
      year: year,
      isComplete: true,
    });
    renderHTML();
  } else {
    $(".nothing-unread").remove();
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
  $(".root-readed").html("");
  $.each(bookReaded, (i, obj) => {
    $(".root-readed").append(
      outputReadedHTML(obj.title, obj.year, obj.writer, obj.id, obj.isComplete)
    );
  });

  $(".root-unread").html("");
  $.each(bookUnread, (i, obj) => {
    $(".root-unread").append(
      outputUnreadHTML(obj.title, obj.year, obj.writer, obj.id, obj.isComplete)
    );
  });
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
  deleteBook();
  ifBookEmpty();
  changeShelf();
}

function deleteBook() {
  for (const each of $(".trash-image")) {
    $(each).on("click", () => {
      const id = $(each).attr("data-id");
      const isComplete = $(each).attr("data-is-complete");
      const unreadIndex = bookUnread.findIndex((obj) => obj.id == id);
      const readedIndex = bookReaded.findIndex((obj) => obj.id == id);
      if (isComplete === "true") {
        bookReaded.splice(readedIndex, 1);
        $(`.readed-output-container-${id}`).remove();
        localStorage.setItem("myBooks", JSON.stringify(myBooks));
        ifBookEmpty();
      } else {
        bookUnread.splice(unreadIndex, 1);
        $(`.unread-output-container-${id}`).remove();
        localStorage.setItem("myBooks", JSON.stringify(myBooks));
        ifBookEmpty();
      }
    });
  }
}

function moveToReaded() {
  $.each($(".check-image"), (i, each) => {
    $(each).on("click", () => {
      const id = $(each).attr("data-id");
      bookUnread[i].isComplete = "true";
      bookReaded.push(bookUnread[i]);
      bookUnread.splice(i, 1);
      $(`.unread-output-container-${id}`).remove();
      renderHTML();
    });
  });
}

function moveToUnread() {
  $.each($(".undo-image"), (i, each) => {
    $(each).on("click", () => {
      const id = $(each).attr("data-id");
      bookReaded[i].isComplete = "false";
      bookUnread.push(bookReaded[i]);
      bookReaded.splice(i, 1);
      $(`.readed-output-container-${id}`).remove();
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
function changeShelf() {
  moveToUnread();
  moveToReaded();
}

function ifBookEmpty() {
  ifReadedBookEmpty();
  ifUnreadBookEmpty();
}

function ifReadedBookEmpty() {
  if (bookReaded.length == 0) {
    return $(".root-readed").html(
      '<p class="nothing-unread">You have nothing in this shelf</p>'
    );
  }
}

function ifUnreadBookEmpty() {
  if (bookUnread.length == 0) {
    return $(".root-unread").html(
      '<p class="nothing-unread">You have nothing in this shelf</p>'
    );
  }
}
