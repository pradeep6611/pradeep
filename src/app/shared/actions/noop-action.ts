import { Action } from "@ngrx/store";
import { CommonActionType } from "./common-action-type.enum";

export class NoopAction implements Action {
    public type = String(CommonActionType.NOOP);
    constructor(){}
}