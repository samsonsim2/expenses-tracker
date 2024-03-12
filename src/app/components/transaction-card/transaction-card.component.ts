import { Component, Input } from '@angular/core';
import { ITransaction } from '../../services/transaction.service';
import { formatDate } from '../../utils/utils';
 
@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  @Input() transaction: ITransaction;
  
  isExpense:boolean = true;

  public ngOnInit(): void {
    console.log(this.transaction.categoryIncomeExpenseId)
    if(this.transaction.categoryIncomeExpenseId == '2'){
      this.isExpense = false
    }else{
      this.isExpense = true
    }

    this.transaction.date=formatDate(this.transaction.date)

    console.log(formatDate(this.transaction.date))
  } 
 
 

  
}
