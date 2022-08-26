import { LoadUserDataAction } from "./load-userdata-action"
import { LoadUserDataErrorAction } from "./load-userdata-error-action"
import { UserAuthenticationAction } from "./user-authentication-action"

export enum LoginActionType {
    USER_AUTHENTICATION = 'USER_AUTHENTICATION',
    LOAD_USER_DATA = 'LOAD_USER_DATA',
    LOAD_USER_DATA_ERROR = 'LOAD_USER_DATA_ERROR'
}

export type LoginActions = 
    UserAuthenticationAction |
    LoadUserDataAction |
    LoadUserDataErrorAction