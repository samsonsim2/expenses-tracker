import { Component, Input } from '@angular/core';
import { IGET_Transaction } from '../../services/transaction.service';
 
@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  @Input() transaction: IGET_Transaction;
  
  isExpense:boolean = true;

  public ngOnInit(): void {
    console.log(this.transaction.categoryIncomeExpenseId)
    if(this.transaction.categoryIncomeExpenseId == '2'){
      this.isExpense = false
    }else{
      this.isExpense = true
    }
  } 
 
 

  
}
