import { Action } from "@ngrx/store";
import { Quiz } from "../models/quiz.model";
import { QuizActionType } from "./quiz-action-type.enum";

export class LoadQuizDataDoneAction implements Action {
    public type = String(QuizActionType.LOAD_QUIZ_DATA_DONE);
    constructor(public quiz: Quiz[]){}
}