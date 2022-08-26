import { model } from "mongoose";
import { AppComponent } from "./app.component";
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { PopupComponent } from "./popup/popup.component";
import { QuizComponent } from "./quiz/quiz.component";
import { RegisterComponent } from "./register/register.component";
import { TimerComponent } from "./timer/timer.component";

@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      QuizComponent,
      LoginComponent,
      TimerComponent,
      PopupComponent,
      DashBoardComponent,
      RegisterComponent
    ],
})

export class QuizModule{}