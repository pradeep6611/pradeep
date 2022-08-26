import { Action } from "@ngrx/store";
import { IUser } from "../models/user-interface";
import { UserActionType } from "./user-action-type.eum";

export class UserUpdateDoneAction implements Action {
    public type = String(UserActionType.UPDATE_USER_DONE_ACTION);
    constructor(public loginDetails: IUser){} 
}