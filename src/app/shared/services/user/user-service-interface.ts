import { Observable } from "rxjs";
import { LoginResponse } from "src/app/login/models/login-response.model";
import { IUser } from "./models/user-interface";
import { User } from "./models/user-model";

export interface UserServiceInterface {
    update(empId: string): Observable<User>,
    buildUserProfile(data: LoginResponse): IUser
}