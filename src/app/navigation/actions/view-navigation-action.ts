import { Action } from "@ngrx/store";
import { ViewNavigationModel } from "../models/view-navigation-model";
import { ViewNavigationActionType } from "./view-navigation-action.enum";

export class ViewNavigationAction implements Action {
    public type = String(ViewNavigationActionType.NAVIGATE_TO_NEXT_STATE);
    constructor(public navigationParams: ViewNavigationModel) {}
}