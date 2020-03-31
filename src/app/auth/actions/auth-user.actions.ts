import { createAction } from "@ngrx/store";
import { UserModel } from 'src/app/shared/models';

export const login = createAction(
    "[Auth/User] Login",
    (username: string, password: string) => ({ username, password })
);

export const logout = createAction(
    "[Auth/User] User Logout"
);