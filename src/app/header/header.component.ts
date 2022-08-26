import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() helpBox = new EventEmitter<any>();
  @Input() helpButton;
  logoImage : any = "assets/images/logo.png";
  constructor() { }

  ngOnInit() {
  }

  askHelp(event : any){
    this.helpBox.emit( {title : "help", content : "General Instructions:",showPopUpFlag:true , data : [
      "The quiz contains 4 modules.",
      "Each module contains 20 questions.",
      "The duration of examination for each section is 15 minutes.",
      "The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself.",
      "The pass percentage for each section is 80 and you are allowed to retake the test any number of times.",
      "You can click on the Next/Previous button which appears to the left of question palette to navigate to other questions.",
      "Once the test is completed before the timer,click on the Submit button which is present in the right down corner."
    ] });
  }

}
