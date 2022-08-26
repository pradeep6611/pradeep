import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Output() helpBox = new EventEmitter<any>();
  @Input() helpButton;
  constructor() { }

  ngOnInit() {
  }
  askHelp(event : any){
    event.preventDefault();
    this.helpBox.emit( {title : "help", content : "General Instructions", showPopUpFlag: true , data : [
      "The quiz contains 4 modules.",
      "Each module contains 20 questions.",
      "The duration of quiz for each module is 15 minutes.",
      "The countdown timer in the top right corner of screen will display the remaining time available for you to complete the quiz. When the timer reaches zero, your responses will be auto saved.",
      "The pass percentage for each module is 80 and you are allowed to retake the quiz any number of times.",
      "You can click on the Next/Previous button which appears to the left of question palette to navigate to other questions.",
      "Once you complete the quiz before the time, click on the Submit button at the bottom right corner."
    ] });
  }
}
