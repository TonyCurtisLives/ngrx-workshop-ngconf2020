import { UserModel } from "../models";
import { createReducer, on } from "@ngrx/store";
import { AuthApiActions, AuthUserActions } from "src/app/auth/actions";
import { EntityState } from '@ngrx/entity';

export interface State {
    gettingStatus: boolean;
    user: UserModel | null;
    error: string | null;
}

const initialState: State = {
    gettingStatus: true,
    user: null,
    error: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthUserActions.logout, (state, action) => )
})
