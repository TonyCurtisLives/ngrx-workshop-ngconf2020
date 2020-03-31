import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { createEntityAdapter, EntityState } from "@ngrx/entity"
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";

export interface State extends EntityState<BookModel> {    // bring in entity state
  activeBookId: string | null;
}

export const adapter = createEntityAdapter<BookModel>();    // unsorted entity adapter, which knows how to use the id property of the model, can use a different id - selectId: {model: BookModel) => model.name} can also override sort with sortComparer

export const initialState: State = adapter.getInitialState({   // use adapter
  activeBookId: null
});

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
  }),
  on(BooksApiActions.booksLoaded, (state, action) => {
    return adapter.addAll(action.books, state);
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return adapter.addOne(action.book, {
      ...state,
      activeBookId: null
    });
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return adapter.updateOne(
      { id: action.book.id, changes: action.book },
      {
        ...state,
        activeBookId: null
      }
    );
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return adapter.removeOne(action.bookId, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return booksReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (booksEntities, activeBookId) => {
    return activeBookId ? booksEntities[activeBookId]! : null;
  }
);
export const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
