import { Component, Injectable } from '@angular/core';
import { TransactionService,IGET_Transaction } from '../../services/transaction.service';
 
@Component({
  selector: 'app-monthly-transaction',
  templateUrl: './monthly-transaction.component.html',
  styleUrl: './monthly-transaction.component.css'
})
export class MonthlyTransactionComponent {
  public transactions: IGET_Transaction[];
  constructor(private transactionService:TransactionService){
    this.transactions=[] as IGET_Transaction[];
  }

 
  public ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((res) => {
      console.log(res);
      this.transactions = res;
    });
  } 

}
