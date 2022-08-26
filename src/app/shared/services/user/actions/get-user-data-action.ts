import { Action } from "@ngrx/store";
import { UserActionType } from "./user-action-type.eum";

export class GetUserDataAction implements Action{
    public type = String(UserActionType.GET_USER_DATA_ACTION);
    constructor(){}
}