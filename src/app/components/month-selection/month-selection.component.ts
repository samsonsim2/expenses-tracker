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

  // handleNextMonth(date: Date, isNext:boolean)  {
  //   const currentDate = new Date(date);
  //   let month: number;
  //   isNext
  //     ? (month = currentDate.getMonth() + 1)
  //     : (month = currentDate.getMonth() - 1);
  //   let year = currentDate.getFullYear();
  //   if (month < 0) {
  //     month = 11;
  //     isNext
  //       ? (year = currentDate.getFullYear() + 1)
  //       : (year = currentDate.getFullYear() - 1);
  //   }
  //   this.date = (new Date(year, month));
    
  // };
 
}
