import { Questions } from "./questions.model";

export interface Quiz {
    module_id: number,
	module_name: string,
	isDefault: boolean,
	teamID: string, 
	questions: Questions[]
}