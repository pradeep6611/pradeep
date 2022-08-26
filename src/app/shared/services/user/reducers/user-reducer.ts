import { UserActions, UserActionType } from "../actions/user-action-type.eum";
import { UserUpdateDoneAction } from "../actions/user-update-done-action";
import { IUser } from "../models/user-interface";
import { UserState } from "./use-state";

const initialState = <UserState> {
    action: UserActionType.USER_INITIAL_ACTION,
    loginResponse: <IUser>{},
    token: null,
}

export const userFeatureKey = 'user'; 

export function UserReducer(state: UserState = initialState, action: UserActions): UserState {
    switch(action.type) {
        case UserActionType.UPDATE_USER_DONE_ACTION:
            return {
                ...state,
                loginResponse: (action as UserUpdateDoneAction).loginDetails
            }
        case UserActionType.UPDATE_USER_ERROR_ACTION:
            return {
                ...state,
                loginResponse: initialState.loginResponse
            }
        default: 
            return state;
    }
}