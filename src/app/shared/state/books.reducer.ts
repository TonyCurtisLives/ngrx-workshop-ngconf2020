import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { bookDeleted } from 'src/app/books/actions/books-api.actions';

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map(book => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter(book => bookId !== book.id);
// chall 3.1
export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}
// ch 3.2
export const initialState: State = {
  collection: [],
  activeBookId: null
};
// ch 3.3
export const booksReducer = createReducer(
  initialState,
  on(BooksPageActions.clearSelectedBook, BooksPageActions.enter, state => {
    return {
      ...state,
      activeBookId: null
    };
  }),
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId
    };
  }), // start ch 5
  on(BooksApiActions.booksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books
    };
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return {
      collection: createBook(state.collection, action.book),
      activeBookId: null
    };
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return {
      collection: updateBook(state.collection, action.book),
      activeBookId: null
    };
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.bookId)
    }; // end ch 5
  })
); // ch 4.1
export function reducer(state: State | undefined, action: Action) {
    return booksReducer(state, action);
}
// ch 6.1 Getter Selectors (returns property from state) can also be used as input to more complex selectors
export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector( // ch 6.2 complex selector transforms, uses projector function to create or compute a new value
    selectAll,
    selectActiveBookId,
    (books, selectActiveBookId) => books.find(book => book.id === selectActiveBookId) || null
);
export const selectEarningsTotals = createSelector( // ch6.3 complex selector one prop
    selectAll,
    calculateBooksGrossEarnings
);
