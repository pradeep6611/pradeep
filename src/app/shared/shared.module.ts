import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";

import { StoreModule } from "@ngrx/store";
import * as fromShared from "./reducers/shared-reducer";
import { UserEffects } from "./services/user/effects/user-effects";

@NgModule({
    imports: [
        // EffectsModule.forRoot([UserEffects]),
        StoreModule.forFeature(fromShared.sharedFeatureKey, fromShared.reducers),

    ]
})

export class SharedModule {};