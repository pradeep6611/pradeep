import { MemberDetails } from "../../member/member-model";
import { IUser } from "./user-interface";

export class User implements IUser {
    readonly profile: MemberDetails;
    readonly token?: string;
    readonly isValidUserId: boolean;

    constructor(authDetails: IUser) {
        this.profile = Object.keys(authDetails.profile).length <= 0 ? null : authDetails.profile,
        this.isValidUserId = authDetails.isValidUserId
    }
}