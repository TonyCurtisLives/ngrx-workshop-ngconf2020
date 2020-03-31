import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";  // ch 4.2
import { calculateBooksGrossEarnings } from '../models';
// ch 4.3
export interface State {
    books: fromBooks.State;
}// ch 4.4
export const reducers: ActionReducerMap<State> = {
    books: fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
// ch 7
/**
 * Books Selectors
 */
export const selectBooksState = (state: State) => state.books; // ch 7.1
export const selectAllBooks = createSelector(  // ch 7.2
    selectBooksState,
    fromBooks.selectAll
);
export const selectActiveBook = createSelector(
    selectBooksState,
    fromBooks.selectActiveBook
);
export const selectBooksEarningsTotals = createSelector(
    selectBooksState,
    fromBooks.selectEarningsTotals
);

