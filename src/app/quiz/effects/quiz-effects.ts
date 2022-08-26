import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { combineLatest, Observable, of } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/internal/operators";
import { QuizActions, QuizActionType } from "../actions/quiz-action-type.enum";
import { QuizService } from "../services/quiz-service";
import { QuizModel } from "../models/quiz-response.model";
import { LoadQuizDataDoneAction } from "../actions/load-quiz-data-done-action";
import { NoopAction } from "src/app/shared/actions/noop-action";
import { Store } from "@ngrx/store";
import * as fromShared from '../../shared/reducers/shared-reducer';
import { Quiz } from "../models/quiz.model";
import { IUser } from "src/app/shared/services/user/models/user-interface";

@Injectable()
export class QuizEffects {

    @Effect()
    getQuizData$: Observable<LoadQuizDataDoneAction | NoopAction> = this.actions$.pipe(
        ofType(QuizActionType[QuizActionType.LOAD_QUIZ_DATA]),
        withLatestFrom(this.store$.select(fromShared.selectUserProfile)),
        switchMap(([, loginDetails]) => {
            return combineLatest(
                of(loginDetails),
                this.quizService.loadQuestion()
            )
        }),
        map(([user, quizData]: [IUser, QuizModel]) => {
            const modules: Quiz[]= !!quizData ? quizData.modules : [];
            const teamModule = this.quizService.getTeamModule(modules, user);
            if(teamModule.length > 0) {
                return new LoadQuizDataDoneAction(teamModule)
            } else {
                return new NoopAction();
            }
        })
    )

    constructor(
        private actions$: Actions<QuizActions>,
        private quizService: QuizService,
        private store$: Store<fromShared.State>
    ){}
}