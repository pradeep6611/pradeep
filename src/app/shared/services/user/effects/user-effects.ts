import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/internal/operators";
import { UserActions, UserActionType } from "../actions/user-action-type.eum";
import * as fromRoot from "../../../../../app/app.reducer";
import { UserService } from "../user-service";
import { User } from "../models/user-model";
import { UserUpdateDoneAction } from "../actions/user-update-done-action";
import { NoopAction } from "src/app/shared/actions/noop-action";

@Injectable()
export class UserEffects {

    @Effect()
    getUserData$: Observable<UserActions> = this.actions$.pipe(
        ofType<Action>(UserActionType[UserActionType.GET_USER_DATA_ACTION]),
        withLatestFrom(this.store$.select(fromRoot.selectRouterState)),
        switchMap(([, router]) => {
            const queryParams  = router.state.queryParams;
            if(!!queryParams && !!queryParams.empId) {
                return this.userService.update(queryParams.empId).pipe(
                    map((user: User) =>  {
                        if(!!user.profile && user.isValidUserId) {
                            return new UserUpdateDoneAction(user);
                        } else {
                            return new NoopAction();
                        }
                    }),
                    catchError(() => of(new NoopAction()))
                )
            }
        })
    );

    constructor(private actions$: Actions<UserActions>,
        private userService: UserService,
        private store$: Store<fromRoot.AppState>
    ){}
}