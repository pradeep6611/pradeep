import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/internal/operators";
import { ViewNavigationAction } from "../actions/view-navigation-action";
import { ViewNavigationActionType } from "../actions/view-navigation-action.enum";
import { ViewNavigationModel } from "../models/view-navigation-model";

@Injectable()
export class ViewNavigationEffects {

    @Effect({dispatch: false})
    routerNaviagtion$ = this.actions$.pipe(
        ofType<Action>(ViewNavigationActionType[ViewNavigationActionType.NAVIGATE_TO_NEXT_STATE]),
        tap((action: ViewNavigationAction) => {
            const params: ViewNavigationModel = action.navigationParams;
            this.router.navigateByUrl(this.router.createUrlTree([params.path], { queryParams: params.params}))
        })
    )

    constructor(
        private router: Router,
        private actions$: Actions<ViewNavigationAction>
    ) {}
}