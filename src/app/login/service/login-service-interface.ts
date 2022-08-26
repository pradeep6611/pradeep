import { Observable } from "rxjs";
import { AuthDetails } from "../models/authDetails-interface";
import { LoginDetails } from "../models/login-request.model";
import { LoginResponse } from "../models/login-response.model";

export interface LoginServiceInterface {
    authenticate(loginDetails: LoginDetails): Observable<AuthDetails>,
    validateUser(LoginResponse: LoginResponse): AuthDetails
}