import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
@Input() expensesPieChart : any;
@Input() incomePieChart : any;

ngOnInit(){
  console.log(`excomepie:${this.expensesPieChart}`)
  console.log("hihi")
}
}
