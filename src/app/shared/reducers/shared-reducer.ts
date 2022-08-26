import { Action, combineReducers, createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../services/user/reducers/use-state";
import * as fromUser from '../services/user/reducers/user-reducer';
import * as fromRoot from '../../app.reducer';

export function reducers(state: SharedState | undefined, action: Action): SharedState {
    return combineReducers({
        [fromUser.userFeatureKey]: fromUser.UserReducer
    })(state, action);
}

export const sharedFeatureKey = 'shared';

export interface SharedState {
    user: UserState
}

export interface State extends fromRoot.AppState {
    [sharedFeatureKey]: SharedState
}

export const selectSharedState = createFeatureSelector<State, SharedState>(
    sharedFeatureKey
)

export const selectUserProfile = createSelector(
    selectSharedState,
    (state: SharedState) => state.user.loginResponse
)

