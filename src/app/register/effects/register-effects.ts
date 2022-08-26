import { Injectable, Testability } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { concatMap, map, withLatestFrom } from "rxjs/operators";
import { RegisterFacadeService } from "../facades/register.facade.service";
import { RegisterService } from "../services/register-service";
import * as RegisterActions from "../actions/register-actions";
import { Teams } from "../models/teams-model";

@Injectable()
export class RegisterEffects {
    
    updateTeamsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegisterActions.updateTeams),
            withLatestFrom(this.registerFacadeService.teams$),
            concatMap(([, teams]) => {
                return teams && teams.length > 0 ?
                of(RegisterActions.noop()) :
                this.registerService.loadTeams().pipe(map((teams: Teams[]) => RegisterActions.updateSuccess({ teams: teams })))
            })
        )
    )
    
    constructor(
        private registerService: RegisterService, 
        private actions$: Actions, 
        private registerFacadeService: RegisterFacadeService
    ) {}
}