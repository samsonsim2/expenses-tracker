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
import { UserService } from '../../services/user.service';
import { CognitoService } from '../../services/cognito.service';
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
  currentUserId: number;
  openForm: boolean = false;
  public transactions: IGET_Transaction[];
  public transactionPieChart: any;
  piechartArray: any[] = [];
  public formattedData(o: { [key: string]: number }) {
    for (const [key, value] of Object.entries(o)) {
      console.log({ name: key, value: value });
      this.piechartArray.push({ name: key, value: value });
    }

    return this.piechartArray;
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
  date : Date = new Date();
  handleNextMonth(object:any)  {
      this.piechartArray=[]

  
    const date = object.date 
    const isNext= object.isNext
    const currentDate = new Date(date);
    let month: number;
    isNext
      ? (month = currentDate.getMonth() + 1)
      : (month = currentDate.getMonth() - 1);
    let year = currentDate.getFullYear();
    if (month < 0) {
      month = 11;
      isNext
        ? (year = currentDate.getFullYear() + 1)
        : (year = currentDate.getFullYear() - 1);
    }
    this.date = (new Date(year, month));

    this.transactionService
    .getTransactions(this.currentUserId,this.date.getMonth()+1,this.date.getFullYear())
    .subscribe((res) => {
      console.log(res)
      res.map((t: any) => {
        console.log(t.categoryName);
      });

      this.transactions = res;
      console.log(this.transactions);

      const test = res.map((t: any): transactionData => {
        return { name: t.categoryName, amount: t.amount };
      });

      this.transactionPieChart = this.formattedData(this.sumValues(test));
    });
    
  };

  public toggleForm(): void {
    console.log('toggle');
    this.openForm = !this.openForm;
  }

  constructor(
    private transactionService: TransactionService,
    private cognitoService: CognitoService,
    private userService: UserService
  ) {
    this.transactions = [] as IGET_Transaction[];
    Object.assign(this, { productSales });
  }
 

  

  


  public async ngOnInit() {
    // get aws username of the user
    const user = await this.cognitoService.getUser();
    // find the userId using the aws username, and set the currentUserId
    const userId = this.userService
      .getUserByUsername(user.username)
      .subscribe((res) => {
         
        this.currentUserId = res.id;
        this.transactionService
          .getTransactions(this.currentUserId,this.date.getMonth()+1,this.date.getFullYear())
          .subscribe((res) => {
            console.log(res)
            res.map((t: any) => {
              console.log(t.categoryName);
            });

            this.transactions = res;
            console.log(this.transactions);

            const test = res.map((t: any): transactionData => {
              return { name: t.categoryName, amount: t.amount };
            });

            this.transactionPieChart = this.formattedData(this.sumValues(test));
          });
      });
  }
}
