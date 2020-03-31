import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs/operators";
import { BooksService } from "../shared/services";
import { BooksPageActions, BooksApiActions } from "./actions";

@Injectable()
export class BooksApiEffects {
    constructor(private booksService: BooksService, private action$: Actions) {}

    loadBooks = createEffect(() => 
        this.action$.pipe(
            ofType(BooksPageActions.enter),  // listen for this action
            mergeMap(() =>
                this.booksService
                .all()
                .pipe(map(books => BooksApiActions.booksLoaded({ books })))  // send this action
            )
        )
    );
}