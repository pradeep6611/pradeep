import { Options } from "./options.model";

export interface Questions {
    id: string, 
    q_name: string, 
    q_options: Options[],
    q_answer: string, 
    q_checked: string
}