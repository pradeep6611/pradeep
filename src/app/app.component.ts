import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'QuizApp';
  helpBoxData: any;
  hideHelp: any = true;
  submit: Boolean = false;
  @ViewChild(QuizComponent) quiz;
  
  constructor() {}

  openHelpBox(value: any) {
    this.helpBoxData = value;
  }

  hideHelpButton(value: any) {
    if(value === "help"){
      this.hideHelp = false;
    } else if(value === "submit"){
      this.helpBoxData = { title: "submit", content: "Are you sure you want to submit ?", showPopUpFlag: true, button: 'Yes' };
    } else if(value === "time-submit"){
      this.helpBoxData = { title: "timeout", content: "Please click 'OK' to view the result", showPopUpFlag: true, button: 'Ok' };
    }
  }

  submitQuiz() {
    this.hideHelp = true;
    this.quiz.submitQuiz();
  }
}
