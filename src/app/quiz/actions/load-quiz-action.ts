import { Action } from "@ngrx/store";
import { QuizActionType } from "./quiz-action-type.enum";

export class LoadQuizDataAction implements Action {
    public type = String(QuizActionType.LOAD_QUIZ_DATA);
    constructor(){}
}