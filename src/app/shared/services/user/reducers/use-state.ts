import { UserActionType } from "../actions/user-action-type.eum";
import { IUser } from "../models/user-interface";

export interface UserState {
    action: UserActionType;
    loginResponse: IUser;
    token: string;
}