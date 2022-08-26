import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/internal/operators";
import { HttpOptionsConfig } from "src/app/common/http/http-options-model";
import { HttpService } from "src/app/common/http/http-service";
import { AuthDetails } from "../models/authDetails-interface";
import { LoginDetails } from "../models/login-request.model";
import { LoginResponse } from "../models/login-response.model";
import { LoginServiceInterface } from "./login-service-interface";

const AUTHENTICATE_USER = 'api/QuizDetails/auth/userAuthentication';

@Injectable({
    providedIn: 'root'
})

export class LoginService implements LoginServiceInterface {

    constructor(
        private httpService: HttpService,
        private http: HttpClient
    ) {}

    authenticate(loginDetails: LoginDetails): Observable<AuthDetails> {
        const httpOptions = this.buildHTTPRequestOptions(loginDetails);
        return this.http.post(AUTHENTICATE_USER, httpOptions).pipe(
            map((data: LoginResponse) => {
                return this.validateUser(data);
            }))
    }

    validateUser(data: LoginResponse) : AuthDetails {
        return <AuthDetails> {
            _id: data._id,
            isValidUserId: data.validUser
        }
    }

    buildHTTPRequestOptions(loginDetails: LoginDetails): HttpOptionsConfig {
        return {
            headers: this.httpService.buildHttpHeaders(),
            body: this.buildRequestBody(loginDetails)
        }
    }

    buildRequestBody(loginDetails: LoginDetails) {
        const requestBody = {
            "userId": loginDetails.userId,
            "password": loginDetails.password
        }
        return requestBody;
    }
}

