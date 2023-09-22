export const myBooks = JSON.parse(localStorage.getItem("myBooks")) || {
  bookReaded: [],
  bookUnread: [],
};

export const { bookReaded, bookUnread } = myBooks;

const setLocalStorage = () => {
  return localStorage.setItem("myBooks", JSON.stringify(myBooks))
}

export default setLocalStorage