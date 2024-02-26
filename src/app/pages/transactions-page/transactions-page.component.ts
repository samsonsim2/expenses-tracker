import {
  Component,
  EventEmitter,
  Input,
  Output,
  Injectable,
} from '@angular/core';
import { productSales } from '../../data/data';

import {
  TransactionService,
  IGET_Transaction,
} from '../../services/transaction.service';
interface transactionData {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.css',
})
export class TransactionsPageComponent {
  @Output() onDeleteCategory = new EventEmitter();
  productSales: any[];
  openForm: boolean = false;
  public transactions: IGET_Transaction[];
  public transactionPieChart: any;

  public toggleForm(): void {
    console.log('toggle');
    this.openForm = !this.openForm;
  }

  constructor(private transactionService: TransactionService) {
    this.transactions = [] as IGET_Transaction[];
    Object.assign(this, { productSales });
  }
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

  piechartArray: any[] = [];
  public formattedData(o: { [key: string]: number }) {
    for (const [key, value] of Object.entries(o)) {
      console.log({ name: key, value: value });
      this.piechartArray.push({ name: key, value: value });
    }

    return this.piechartArray;
  }

  public ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((res) => {
      res.map((t: any) => {
        console.log(t.categoryName);
      });

      this.transactions = res;

      const test = res.map((t: any): transactionData => {
        return { name: t.categoryName, amount: t.amount };
      });

      this.transactionPieChart = this.formattedData(this.sumValues(test));
    });
  }
}
