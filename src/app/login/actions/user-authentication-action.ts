import { Action } from "@ngrx/store";
import { LoginDetails } from "../models/login-request.model";
import { LoginActionType } from "./login-action-type.enum";

export class UserAuthenticationAction implements Action {
    public type = String(LoginActionType.USER_AUTHENTICATION);
    constructor(public loginDetails: LoginDetails){}
}