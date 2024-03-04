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
import { map, switchMap } from 'rxjs';
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
  currentPage: number = 1;
  totalPages: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  openForm: boolean = false;
  public transactions: IGET_Transaction[];
  public expensesPieChart: any;
  public incomePieChart: any;
  expensesPieChartArray: any[] = [];
  incomePieChartArray: any[] = [];

  date: Date = new Date();
  handleNextMonth(object: any) {
    this.expensesPieChartArray = [];

    const date = object.date;
    const isNext = object.isNext;
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
    this.date = new Date(year, month);

    this.transactionService
      .getTransactions(
        this.currentUserId,
        this.date.getMonth() + 1,
        this.date.getFullYear(),
        this.pageSize,
        this.pageNumber
      )
      .subscribe((res) => {
        res.map((t: any) => {
          console.log(t.categoryName);
        });

        this.transactions = res;

        const test = res.map((t: any): transactionData => {
          return { name: t.categoryName, amount: t.amount };
        });

        this.expensesPieChart = this.formattedExpenseData(this.sumValues(test));
        this.transactionService
          .countTransactionPages(
            this.currentUserId,
            this.date.getMonth() + 1,
            this.date.getFullYear(),
            this.pageSize
          )
          .subscribe((res) => (this.totalPages = res));
      });
  }

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
    //Get user
    const user = await this.cognitoService.getUser();
    this.userService.getUserByUsername(user.username).subscribe((res) => {
      //-------------------START: Fetch Monthly Transactions (Paginated data)----------------------//
      //SET current User
      this.currentUserId = res.id;
      // GET transactions
      this.transactionService
        .getTransactions(
          this.currentUserId,
          this.date.getMonth() + 1,
          this.date.getFullYear(),
          this.pageSize,
          this.pageNumber
        )
        .subscribe((res) => {
          //SET transactions
          this.transactions = res;
          //GET number of pages
          this.countTotalPages();
        });
      //-------------------END: Fetch Monthly Transactions----------------------//

      //-------------------START: Fetch Monthly Transactions For PieChart (Unpaginated data) ----------------------//
      this.transactionService
        .getTransactions(
          this.currentUserId,
          this.date.getMonth() + 1,
          this.date.getFullYear(),
          10000, //use a high page size to fetch all data
          this.pageNumber
        )
        .subscribe((res) => {         

          //Create Expenses Pie Chart
          const expensesPieChartData = this.formatData(res, 1);
          this.expensesPieChart = expensesPieChartData;
         //Create Income Pie Chart
          const incomePieChartData = this.formatData(res, 2);
          this.incomePieChart = incomePieChartData;
        });

      //-------------------END: Fetch Monthly Transactions For PieChart (Unpaginated data) ----------------------//
    });
  }

  public formatData(transactions: transactionData[], incomeExpenseId: number) {
    //formats list of transactions into the appropriate format for pie chart.
    // specifying 1 for incomeExpenseId  returns transactions that are  expenses, specifying 2 filters returns transactions that are  income
    const formattedData = transactions
      .filter((t: any) => t.categoryIncomeExpenseId == incomeExpenseId)
      .map((t: any) => {
        return { name: t.categoryName, amount: t.amount };
      })
      .reduce((acc: any, curr: any) => {
        const found = acc.find((item: any) => item.name === curr.name);
        if (found) {
          found.value += curr.amount;
        } else {
          acc.push({ name: curr.name, value: curr.amount });
        }
        return acc;
      }, []);

    return formattedData;
  }

  public formattedExpenseData(o: { [key: string]: number }) {
    //Returns an array that is formatted for the pieChart input
    for (const [key, value] of Object.entries(o)) {
      console.log({ name: key, value: value });
      this.expensesPieChartArray.push({ name: key, value: value });
    }
    return this.expensesPieChartArray;
  }
  public formattedIncomeData(o: { [key: string]: number }) {
    //Returns an array that is formatted for the pieChart input
    for (const [key, value] of Object.entries(o)) {
      console.log({ name: key, value: value });
      this.incomePieChartArray.push({ name: key, value: value });
    }
    return this.incomePieChartArray;
  }

  public sumValues(arr: transactionData[]): { [key: string]: number } {
    //Sums up the values of each category
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

  public countTotalPages() {
    this.transactionService
      .countTransactionPages(
        this.currentUserId,
        this.date.getMonth() + 1,
        this.date.getFullYear(),
        this.pageSize
      )
      .subscribe((res) => (this.totalPages = res));
  }
}
