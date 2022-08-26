import { LoadQuizDataAction } from "./load-quiz-action";
import { LoadQuizDataDoneAction } from "./load-quiz-data-done-action";

export enum QuizActionType {
    LOAD_QUIZ_DATA = "LOAD_QUIZ_DATA",
    LOAD_QUIZ_DATA_DONE = 'LOAD_QUIZ_DATA_DONE'
}

export type QuizActions = 
    LoadQuizDataAction |
    LoadQuizDataDoneAction