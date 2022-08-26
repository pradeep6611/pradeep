import { Action } from "@ngrx/store";
import { LoginActionType } from "./login-action-type.enum";

export class LoadUserDataErrorAction implements Action {
    public type = String(LoginActionType.LOAD_USER_DATA_ERROR);
    constructor(public error?: any){}
}