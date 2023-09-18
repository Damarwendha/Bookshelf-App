export const myBooks = JSON.parse(localStorage.getItem("myBooks")) || {
  bookReaded: [],
  bookUnread: [],
};

export const { bookReaded, bookUnread } = myBooks;

class Render {
  constructor(rootName) {
    this.root = $(`.${rootName}`);
  }

  html0() {
    this.root.html("");
  }

  html(book, str, img) {
    $.each(book, (i, obj) => {
      this.root.append(
        `
        <div class="${str}-output-container ${str}-output-container-${obj.id}">
              <div class="not-readed-output-left">
                <h4>${obj.title}<h4>(${obj.year})</h4></h4>
                <h6 class="writer-text">${obj.writer}</h6>
              </div>
              <div class="not-readed-icons">
                <img src="image/icons8-${img}.png" alt="undo" class="${img}-image" data-id="${obj.id}">
                <img src="image/icons8-delete-64.png" alt="delete" class="trash-image" data-id="${obj.id}" data-is-complete="${obj.isComplete}">
              </div>
            </div>
        `
      );
    });
  }

  changeShelf(book, str, img, boo){
    $.each($(`.${img}-image`), (i, each) => {
      $(each).on("click", () => {
        const id = $(each).attr("data-id");
        book[i].isComplete = boo;
        if(book === bookUnread){
          bookReaded.push(book[i]);
        }else{
          bookUnread.push(book[i]);
        }
        book.splice(i, 1);
        $(`.${str}-output-container-${id}`).remove();
        renderHTML();
      });
    });
  }

  ifBookEmpty(book){
    if (book.length == 0) {
      return this.root.html(
        '<p class="nothing-unread">You have nothing in this shelf</p>'
      );
    }
  }

  deleteBook() {
    for (const each of $(".trash-image")) {
      $(each).on("click", () => {
        const id = $(each).attr("data-id");
        const isComplete = $(each).attr("data-is-complete");
        if (isComplete === "true") {
          const readedIndex = bookReaded.findIndex((obj) => obj.id == id);
          if (readedIndex !== -1) {
          bookReaded.splice(readedIndex, 1);
          $(`.readed-output-container-${id}`).remove();
          localStorage.setItem("myBooks", JSON.stringify(myBooks));
          renderHTML();
          }
        } else {
          const unreadIndex = bookUnread.findIndex((obj) => obj.id == id);
          if (unreadIndex !== -1) {
          bookUnread.splice(unreadIndex, 1);
          $(`.unread-output-container-${id}`).remove();
          localStorage.setItem("myBooks", JSON.stringify(myBooks));
          renderHTML();
          }
        }
      });
    }
  }

  execute(book, str, img, boo) {
    this.html0();
    this.html(book, str, img);
    this.deleteBook();
    this.changeShelf(book, str, img, boo);
    this.ifBookEmpty(book)
  }
}

const renderReaded = new Render("root-readed");
const renderUnread = new Render("root-unread");

export const renderHTML = () => {
  renderReaded.execute(bookReaded, 'readed', 'undo', false);
  renderUnread.execute(bookUnread, 'unread', 'check', true);
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
}