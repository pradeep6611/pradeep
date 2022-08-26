import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuizComponent } from './quiz/quiz.component';
import { LoginComponent } from './login/login.component';
import { TimerComponent } from './timer/timer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RegisterComponent } from './register/register.component';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RegisterEffects } from './register/effects/register-effects';
import { QuizEffects } from './quiz/effects/quiz-effects';
import { SharedModule } from './shared/shared.module';
import { LoginEffects } from './login/effects/login-effects';
import { CommonModule } from '@angular/common';
import { ViewNavigationEffects } from './navigation/effects/view-navigation-effects';
import { LoginService } from './login/service/login-service';
import { QuizService } from './quiz/services/quiz-service';
import { RegisterService } from './register/services/register-service';
import { StorageService } from './shared/services/storage-service/storage.service';
import { UserService } from './shared/services/user/user-service';
import { HttpService } from './common/http/http-service';
import { UserEffects } from './shared/services/user/effects/user-effects';
import { QuizModule } from './quiz.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    QuizModule,
    EffectsModule.forRoot([QuizEffects, RegisterEffects, LoginEffects, ViewNavigationEffects, UserEffects]),
    StoreModule.forRoot(ROOT_REDUCERS, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot({serializer: DefaultRouterStateSerializer}),
  ],
  // providers: [LoginService, QuizService, RegisterService, UserService, HttpService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
