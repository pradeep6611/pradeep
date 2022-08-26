import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnChanges {

  @Input() quizTime;
  data : any = 0;
  interval : any ;
  hours :any;
  seconds :any;
  minutes :any;
  displaySeconds : any = '00';
  displayMinutes : any = '15';

  changes:any  = "asdasda";
  
  @Output() saveQuiz = new EventEmitter<any>();

  constructor() {
    
  }

  ngOnChanges(changes :SimpleChanges) {
    this.startTimer(Number(changes.quizTime.currentValue));
  }

  startTimer(time : any){
    // var dt = new Date();
    // dt.setMinutes( dt.getMinutes() + 60 );
    // this.data = dt.getTime();
    var counter = 0;
    var i = 0;
    this.interval = setInterval(()=>{
      counter += 1000;
      var distance = this.quizTime * 60 * 1000 - counter;
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if(this.seconds <= 0 && this.minutes <= 0){
          this.submitQuiz();
      }
      this.displaySeconds = this.seconds < 10 ? '0'+this.seconds : this.seconds;
      this.displayMinutes = this.minutes < 10 ? '0'+this.minutes : this.minutes;
      i++;
    }, 1000);
 
  }
  submitQuiz(){
    clearInterval(this.interval);
    this.saveQuiz.emit("time-submit");
  }
  

}
