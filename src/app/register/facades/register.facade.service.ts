import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { Teams } from "../models/teams-model";
import { selectTeam } from "../reducers/register-reducer";
import { RegisterFacadeInterface } from "./register.facade.service.interface";
import * as RegisterActions from "../actions/register-actions";

@Injectable({
    providedIn: 'root'
})

export class RegisterFacadeService implements RegisterFacadeInterface {
    public teams$: Observable<Teams[]>;

    constructor(private store$: Store<AppState>) {
        this.teams$ = this.store$.pipe(select(selectTeam));
    }

    loadTeams(): void {
        this.store$.dispatch(RegisterActions.updateTeams());
    }
}