import { LoadQuizDataDoneAction } from "../actions/load-quiz-data-done-action";
import { QuizActions, QuizActionType } from "../actions/quiz-action-type.enum";
import { QuizState } from "./quiz-state";
import { Quiz } from "../models/quiz.model";
import { Action, createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";

const initialState = <QuizState> {
    quizData: [] as Quiz[]
}

export function _quizReducer (state: QuizState = initialState, action: QuizActions) {
    switch(action.type) {
        case QuizActionType.LOAD_QUIZ_DATA_DONE:
            return {
                ...state,
                quizData: (action as LoadQuizDataDoneAction).quiz
            }
        default:
            return state;
    }
}

export function QuizReducer(state: QuizState | undefined, action: Action) {
    return _quizReducer(state, action);
}

const selectModuleState = (state: AppState) => state.quizModule;
export const selectModule = createSelector(selectModuleState, (state: QuizState) => state.quizData)