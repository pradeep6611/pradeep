import { Action } from "@ngrx/store";
import { IUser } from "src/app/shared/services/user/models/user-interface";
import { LoginActionType } from "./login-action-type.enum";

export class LoadUserDataAction implements Action {
    public type = String(LoginActionType.LOAD_USER_DATA);
    constructor(public userData: IUser){}
}