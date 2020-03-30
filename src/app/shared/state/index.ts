import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";  // ch 4.2

export interface State {
    book: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
    books: fromBooks.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
