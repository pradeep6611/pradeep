import { Component, OnInit , Output, EventEmitter, Input, OnChanges, DoCheck} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnChanges {

  
  @Input() dataProps;
  @Output() submit = new EventEmitter<any>();
  showPopup : Boolean = false;
  constructor() { }

  ngOnChanges() {
    if(this.dataProps != undefined && this.dataProps){
      this.showPopup = this.dataProps.showPopUpFlag;
    }
  }


  onChange(){
    if(this.dataProps != undefined && this.dataProps){
      this.dataProps.showPopUpFlag=false;
      this.showPopup = this.dataProps.showPopUpFlag;
    }
  }

  submitQuiz(){
    this.submit.emit();
    this.onChange();
  }
}
