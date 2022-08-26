import { MemberDetails } from "../../member/member-model";

export interface IUser {
 profile: MemberDetails,
 isValidUserId: boolean
}