import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { productSales } from '../../data/data';
 
@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css'
})
export class TransactionsPageComponent {

  @Output() onDeleteCategory = new EventEmitter();
  productSales: any[]
  openForm:boolean =false

  public toggleForm(): void {
    console.log("toggle")
   this.openForm = !this.openForm 
  }

  


  constructor() { Object.assign(this, { productSales  }) }



}

 
 
 

