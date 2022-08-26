import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap, createSelector } from "@ngrx/store";
import { QuizReducer } from "./quiz/reducers/quiz-reducer";
import { QuizState } from "./quiz/reducers/quiz-state";
import { RegisterReducer } from "./register/reducers/register-reducer";
import { RegisterState } from "./register/reducers/register-state";


export interface IRouterState {
    url: string
    queryParams: {
        empId: string
    }
}

export interface AppState {
    router: RouterReducerState<IRouterState>
    register: RegisterState,
    quizModule: QuizState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState, any> = {
    router: routerReducer,
    register: RegisterReducer,
    quizModule: QuizReducer
};

const selectRouter = (state: AppState) => state.router;

export const selectRouterState = createSelector(
    selectRouter,
    (state) => state
)