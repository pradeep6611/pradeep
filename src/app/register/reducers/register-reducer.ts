import * as RegisterActions from "../actions/register-actions";
import { RegisterState } from "./register-state";
import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Teams } from "../models/teams-model";
import { AppState } from "src/app/app.reducer";

const initialState: RegisterState =  {
    teams: [] as Teams[]
}

const _registerReducer = createReducer(
    initialState,
    on(RegisterActions.updateSuccess, (state, teams) => ({...state, ...teams}))
);

export function RegisterReducer(state: RegisterState | undefined, action: Action) {
    return _registerReducer(state, action);
}

const selectTeamState = (state: AppState) => state.register;
export const selectTeam = createSelector(selectTeamState, (state: RegisterState) => state.teams)

