import { Component, Injectable, Input ,Output,EventEmitter} from '@angular/core';
import {
  TransactionService,
  ITransaction,
} from '../../services/transaction.service';
interface transactionData {
  name: string;
  amount: number;
}
@Component({
  selector: 'app-monthly-transaction',
  templateUrl: './monthly-transaction.component.html',
  styleUrl: './monthly-transaction.component.css',
})
export class MonthlyTransactionComponent {
  @Input() public transactions: ITransaction[];
  @Output() deleteTransaction = new EventEmitter()
  public transactionPieChart: any[];

  constructor(private transactionService: TransactionService) {}
  public sumValues(arr: transactionData[]): { [key: string]: number } {
    const sums: { [key: string]: number } = {};

    arr.forEach((obj) => {
      const { name, amount } = obj;
      if (sums[name]) {
        sums[name] += amount;
      } else {
        sums[name] = amount;
      }
    });

    return sums;
  }

  public ngOnInit(): void {
    console.log(this.transactions);
  }
  //delete transaction
  public onTransactionDelete(object: any) {
    console.log("trass");

    this.deleteTransaction.emit(object);
    // this.transactionService
    //   .deleteTransaction(object.transactionId)
    //   .subscribe((res) => console.log(res));
    // let newList = this.transactions.filter((res) => {
    //   return res.id !== object.transactionId;
    // });
    // this.transactions = newList;
  }
}
