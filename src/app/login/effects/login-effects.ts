import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import { LoginActions, LoginActionType } from "../actions/login-action-type.enum";
import { UserAuthenticationAction } from "../actions/user-authentication-action";
import { LoginService } from "../service/login-service";
import * as fromRoot from '../../app.reducer';
import { UserUpdateErrorAction } from "src/app/shared/services/user/actions/user-update-error-action";
import { AuthDetails } from "../models/authDetails-interface";
import { ViewNavigationAction } from "src/app/navigation/actions/view-navigation-action";
import { RouterNames } from "src/app/shared/models/route-names.enum";
import { ViewNavigationModel } from "src/app/navigation/models/view-navigation-model";

@Injectable()
export class LoginEffects {
    @Effect()
    userAuthentication$: Observable<ViewNavigationAction | UserUpdateErrorAction> = this.actions$.pipe(
        ofType<Action>(LoginActionType[LoginActionType.USER_AUTHENTICATION]),
        switchMap((action: Action) =>  this.loginService.authenticate((action as UserAuthenticationAction).loginDetails).pipe(
            map((auth: AuthDetails) => {
                const employee_id = auth._id ? auth._id : null;
                const queryParams = {
                    'empID': employee_id
                }
            
                if(!!employee_id && employee_id.length > 0 && auth.isValidUserId) {
                    return new ViewNavigationAction(<ViewNavigationModel>{
                        path: RouterNames.QUIZ_DASHBOARD,
                        params: queryParams
                    })
                } 
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new UserUpdateErrorAction(error));
                return caught;
            })
        ))
    )

    constructor(
        private actions$: Actions<LoginActions>,
        private loginService: LoginService,
        private store$: Store<fromRoot.AppState>
    ){}
}