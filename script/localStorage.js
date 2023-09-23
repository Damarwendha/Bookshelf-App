export const myBooks = JSON.parse(localStorage.getItem("myBooks")) || {
  bookReaded: [],
  bookUnread: [],
};

export const { bookReaded, bookUnread } = myBooks;

export const setLocalStorage = () => {
  return localStorage.setItem("myBooks", JSON.stringify(myBooks))
}
