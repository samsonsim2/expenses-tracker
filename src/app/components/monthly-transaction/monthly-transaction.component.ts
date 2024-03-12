import { Component, Injectable,Input } from '@angular/core';
import { TransactionService,ITransaction } from '../../services/transaction.service';
interface transactionData {
  name: string;
  amount: number;
}
@Component({
  selector: 'app-monthly-transaction',
  templateUrl: './monthly-transaction.component.html',
  styleUrl: './monthly-transaction.component.css'
})


export class MonthlyTransactionComponent {
  @Input() public transactions: ITransaction[];
 

  public transactionPieChart: any[];


  
  // constructor(private transactionService:TransactionService){
  //   this.transactions=[] as IGET_Transaction[];

    
  // }
  public sumValues(arr: transactionData[]): { [key: string]: number } {
    const sums: { [key: string]: number } = {};

    arr.forEach(obj => {
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
    console.log(this.transactions)
     
  }

 
  

}
