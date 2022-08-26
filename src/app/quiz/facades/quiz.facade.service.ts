import { Injectable } from "@angular/core";
import { RouterReducerState } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IRouterState } from "src/app/app.reducer";
import * as fromRoot from '../../app.reducer'; 
import { LoadQuizDataAction } from "../actions/load-quiz-action";
import { Quiz } from "../models/quiz.model";
import * as fromQuiz from "../reducers/quiz-reducer";
import { QuizFacadeServiceInterface } from "./quiz.facade.service.interface";

@Injectable({
    providedIn: 'root'
})

export class QuizFacadeService implements QuizFacadeServiceInterface {
    public route$ : Observable<RouterReducerState<IRouterState>>;
    public selectedModule$: Observable<Quiz[]>;

    constructor(private store$: Store<fromRoot.AppState>){
        this.route$ = this.store$.select(fromRoot.selectRouterState);
        this.selectedModule$ = this.store$.select(fromQuiz.selectModule);
    }

    loadQuestions(): void {
        this.store$.dispatch(new LoadQuizDataAction());
    }
}