import { Observable } from "rxjs";
import { RouterReducerState } from "@ngrx/router-store";
import { IRouterState } from "src/app/app.reducer";
import { Quiz } from "../models/quiz.model";

export interface QuizFacadeServiceInterface {
    route$ : Observable<RouterReducerState<IRouterState>>;
    selectedModule$: Observable<Quiz[]>;
    loadQuestions(value): void;
}