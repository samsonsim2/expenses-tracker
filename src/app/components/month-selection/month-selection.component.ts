import { Component,  EventEmitter, Input, Output } from '@angular/core';
import { months } from '../../data/constants';
 
@Component({
  selector: 'app-month-selection',
  templateUrl: './month-selection.component.html',
  styleUrl: './month-selection.component.css'
})
export class MonthSelectionComponent {

  @Input() date : Date  
  @Output() onNextDate = new EventEmitter();
  month: string[] = months;

  clickNext(date: Date, isNext:boolean) {
    const payload={date,isNext}
    this.onNextDate.emit(payload);
  }

  
 
}
