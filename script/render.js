import {bookReaded, bookUnread} from "./mybooks.js";
import setLocalStorage from './mybooks.js';

class Book {
  constructor(book, bookStr, imgName, isComplete) {
    this.root = $(`.root-${bookStr}`);
    this.book = book;
    this.bookStr = bookStr;
    this.imgName = imgName;
    this.isComplete = isComplete;
  }

  getRoot() {
    return this.root;
  }

  getBook() {
    return this.book;
  }

  getBookStr() {
    return this.bookStr;
  }

  getImgName() {
    return this.imgName;
  }

  getBool() {
    return this.isComplete;
  }

  bookHtml(obj) {
    return `
    <div class="${this.getBookStr()}-output-container ${this.getBookStr()}-output-container-${obj.id}">
          <div class="not-readed-output-left">
            <h4>${obj.title}<h4>(${obj.year})</h4></h4>
            <h6 class="writer-text">${obj.writer}</h6>
          </div>
          <div class="not-readed-icons">
            <img src="image/icons8-${this.getImgName()}.png" alt="undo" class="${this.getImgName()}-image" data-id="${obj.id}">
            <img src="image/icons8-delete-64.png" alt="delete" class="trash-image" data-id="${obj.id}" data-is-complete="${obj.isComplete}">
          </div>
        </div>
    `;
  }

  alertBookEmpty() {
    if (this.getBook().length == 0) {
      return this.getRoot().html(
        '<p class="nothing-unread">You have nothing in this shelf</p>'
      );
    }
  }
}


class Render extends Book {
  bookContainer() {
    this.getRoot().html("");
    $.each(this.getBook(), (i, obj) => {
      this.getRoot().append(this.bookHtml(obj));
    });
  }

  moveButton() {
    $.each($(`.${this.getImgName()}-image`), (i, item) => {
      $(item).on("click", () => {
        const id = $(item).attr("data-id");
        this.getBook()[i].isComplete = this.getBool();
        if (this.getBook() == bookUnread) {
          bookReaded.push(this.getBook()[i]);
        } else {
          bookUnread.push(this.getBook()[i]);
        }
        this.getBook().splice(i, 1);
        $(`.${this.getBookStr()}-output-container-${id}`).remove();
        renderHTML();
      });
    });
  }

  trashButton() {
    for (const item of $(".trash-image")) {
      $(item).on("click", () => {
        const id = $(item).attr("data-id");
        const isComplete = $(item).attr("data-is-complete");
        if (isComplete === "true") {
          const readedIndex = bookReaded.findIndex((obj) => obj.id == id);
          if (readedIndex !== -1) {
            bookReaded.splice(readedIndex, 1);
            $(`.readed-output-container-${id}`).remove();
            renderHTML();
          }
        } else {
          const unreadIndex = bookUnread.findIndex((obj) => obj.id == id);
          if (unreadIndex !== -1) {
            bookUnread.splice(unreadIndex, 1);
            $(`.unread-output-container-${id}`).remove();
            renderHTML();
          }
        }
      });
    }
  }

  renderAll() {
    this.bookContainer();
    this.moveButton();
    this.trashButton();
    this.alertBookEmpty();
  }
}

const renderReaded = new Render(bookReaded, "readed", "undo", false);
const renderUnread = new Render(bookUnread, "unread", "check", true);

const renderHTML = () => {
  renderReaded.renderAll();
  renderUnread.renderAll();
  setLocalStorage();
};

export default renderHTML