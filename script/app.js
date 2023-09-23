import { bookReaded, bookUnread } from "./localStorage.js";
import { renderBoth } from './form.js';

class Book {
  constructor(book, bookStr, imgName, isComplete) {
    this.root = $(`.root-${bookStr}`);
    this.book = book;
    this.bookStr = bookStr;
    this.imgName = imgName;
    this.isComplete = isComplete;
  }

  bookHtml(obj) {
    return `
    <div class="${this.bookStr}-output-container ${this.bookStr}-output-container-${obj.id}">
          <div class="not-readed-output-left">
            <h4>${obj.title}<h4>(${obj.year})</h4></h4>
            <h6 class="writer-text">${obj.writer}</h6>
          </div>
          <div class="not-readed-icons">
            <img src="image/icons8-${this.imgName}.png" alt="undo" class="${this.imgName}-image" data-id="${obj.id}">
            <img src="image/icons8-delete-64.png" alt="delete" class="trash-image" data-id="${obj.id}" data-is-complete="${obj.isComplete}">
          </div>
        </div>
    `;
  }

  alertBookEmpty() {
    if (this.book.length == 0) {
      return this.root.html(
        '<p class="nothing-unread">You have nothing in this shelf</p>'
      );
    }
  }

  moveBook(i, item) {
    const id = $(item).attr("data-id");
    this.book[i].isComplete = this.isComplete;
    if (this.book == bookUnread) {
      bookReaded.push(this.book[i]);
    } else {
      bookUnread.push(this.book[i]);
    }
    this.book.splice(i, 1);
    $(`.${this.bookStr}-output-container-${id}`).remove();
  }

  deleteBook(item) {
    const id = $(item).attr("data-id");
    const isComplete = $(item).attr("data-is-complete");
    if (isComplete === "true") {
      const readedIndex = bookReaded.findIndex((obj) => obj.id == id);
      if (readedIndex !== -1) {
        bookReaded.splice(readedIndex, 1);
        $(`.readed-output-container-${id}`).remove();
      }
    } else {
      const unreadIndex = bookUnread.findIndex((obj) => obj.id == id);
      if (unreadIndex !== -1) {
        bookUnread.splice(unreadIndex, 1);
        $(`.unread-output-container-${id}`).remove();
      }
    }
  }
}

export class Render extends Book {
  bookContainer() {
    this.alertBookEmpty();
    this.root.html("");
    $.each(this.book, (i, obj) => {
      this.root.append(this.bookHtml(obj));
    });

    $.each($(`.${this.imgName}-image`), (i, item) => {
      $(item).on("click", () => {
        this.moveBook(i, item);
        renderBoth();
      });
    });

    $.each($(".trash-image"), (i, item) => {
      $(item).on("click", () => {
        this.deleteBook(item);
        renderBoth();
      });
    });
  }
}
