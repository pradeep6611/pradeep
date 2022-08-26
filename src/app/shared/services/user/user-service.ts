import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators";
import { HttpService } from "src/app/common/http/http-service";
import { LoginResponse } from "src/app/login/models/login-response.model";
import { MemberDetails } from "../member/member-model";
import { IUser } from "./models/user-interface";
import { User } from "./models/user-model";
import { UserServiceInterface } from "./user-service-interface";

const GET_USER_DETAILS_URL =  'api/QuizDetails/getData/getEmpDetail';

@Injectable({
    providedIn: 'root'
})
export class UserService implements UserServiceInterface {
    
    constructor(
        private http: HttpClient, 
        private httpService: HttpService
    ){}
        
    update(empId: string): Observable<User> {
        const defaultUser: IUser = {
            profile: <MemberDetails> {},
            isValidUserId: false
        }
        const httpOptions = this.httpService.buildHTTPRequestOptions(empId);
        return this.http.post(GET_USER_DETAILS_URL, httpOptions).pipe(
            map((data: MemberDetails) => {
                const user = data && data._id ? this.buildUserProfile(data) : defaultUser;
                return new User(user);
            }
        ))
    }

    buildUserProfile(data: MemberDetails): IUser {
        const user: IUser = {
            profile: <MemberDetails> {
                _id: data._id,
                tcsUserId: data.tcsUserId,
                emailId: data.emailId,
                teamName: data.teamName
            }, 
            isValidUserId: !!data._id && !!data.emailId
        }
        return user;
    }
}