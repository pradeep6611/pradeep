import { Action } from "@ngrx/store";
import { UserActionType } from "./user-action-type.eum";

export class UserUpdateErrorAction implements Action {
    public type = String( UserActionType.UPDATE_USER_ERROR_ACTION);
    constructor(public error?: any){}
}