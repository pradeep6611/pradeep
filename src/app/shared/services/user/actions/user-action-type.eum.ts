import { GetUserDataAction } from "./get-user-data-action";
import { UserUpdateDoneAction } from "./user-update-done-action";
import { UserUpdateErrorAction } from "./user-update-error-action";

export enum UserActionType {
    USER_INITIAL_ACTION = 'USER_INITIAL_ACTION',
    GET_USER_DATA_ACTION = 'GET_USER_DATA_ACTION',
    UPDATE_USER_DONE_ACTION = 'UPDATE_USER_DONE_ACTION',
    UPDATE_USER_ERROR_ACTION = 'UPDATE_USER_ERROR_ACTION'
}

export type UserActions = 
    GetUserDataAction |
    UserUpdateDoneAction |
    UserUpdateErrorAction
