import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements AfterViewInit {
  title = 'QuizApp';
  helpBoxData: any;
  hideHelp: any = true;
  submit: boolean = false;
  @ViewChild(QuizComponent) quiz;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit() {}

  openHelpBox(value: any) {
    this.helpBoxData = value;
  }

  hideHelpButton(value: any) {
    if (value === "help") {
      this.hideHelp = false;
    } else if (value === "submit") {
      this.helpBoxData = { title: "submit", content: "Are you sure you want to submit ?", showPopUpFlag: true, button: 'Yes' };
    }
    else if (value === "time-submit") {
      this.helpBoxData = { title: "timeout", content: "Please click 'OK' to view the result", showPopUpFlag: true, button: 'Ok' };
    }
  }

  submitQuiz() {
    this.hideHelp = true;
    this.quiz.submitQuiz();
  }
}
