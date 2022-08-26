import { Observable } from "rxjs";
import { IUser } from "src/app/shared/services/user/models/user-interface";
import { LoginDetails } from "../models/login-request.model";

export interface LoginFacadeServiceInterface {
    userDetails$ : Observable<IUser>;
    authenticateUser(value: LoginDetails): void; 
}