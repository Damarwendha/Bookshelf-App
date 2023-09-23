import { Render } from "./app.js";
import { bookReaded, bookUnread } from "./localStorage.js";
import { setLocalStorage } from "./localStorage.js";

const renderReaded = new Render(bookReaded, "readed", "undo", false);
const renderUnread = new Render(bookUnread, "unread", "check", true);

export const renderBoth = () => {
  renderReaded.bookContainer();
  renderReaded.alertBookEmpty();
  renderUnread.bookContainer();
  renderUnread.alertBookEmpty();
  setLocalStorage();
};
renderBoth();

$(".top-container").on("submit", (e) => {
  e.preventDefault();
  const title = $(".input-title").val();
  const writer = $(".input-writer").val();
  const year = Number($(".input-year").val());
  addBook(title, writer, year);
  resetInput();
  renderBoth();
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
    renderBoth();
  } else {
    $(".nothing-unread").remove();
    bookUnread.push({
      id: +new Date(),
      title: title,
      writer: writer,
      year: year,
      isComplete: false,
    });
    renderBoth();
  }
}
