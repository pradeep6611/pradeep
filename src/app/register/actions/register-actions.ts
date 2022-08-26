import { createAction, props } from "@ngrx/store";
import { Teams } from "../models/teams-model";

export const updateTeams = createAction(
    '[Update Teams] Update Teams'
);

export const updateSuccess = createAction(
    '[Update Teams] Update Teams Success',
    props<{teams: Teams[]}>()
)

export const noop = createAction(
    '[Noop Register Action] Noop Register Action'
);