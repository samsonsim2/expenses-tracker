import { Component, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
 
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
@Input() expensesPieChart : any=[]  ;
@Input() incomePieChart : any=[];
 
 
 
  single: any[];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition = LegendPosition.Below


ngOnInit(){
  
}
}
