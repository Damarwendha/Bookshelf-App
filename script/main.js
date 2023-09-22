import renderHTML from './render.js';
import {bookReaded, bookUnread} from './mybooks.js';

renderHTML();

$(".top-container").on("submit", (e) => {
  e.preventDefault();
  const title = $(".input-title").val();
  const writer = $(".input-writer").val();
  const year = Number($(".input-year").val());
  addBook(title, writer, year);
  resetInput();
  renderHTML();
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

