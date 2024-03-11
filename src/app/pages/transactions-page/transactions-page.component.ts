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
  // pageNumber: number = 1;
  openForm: boolean = false;
  public transactions: IGET_Transaction[];
  public transactionsPieChart: IGET_Transaction[];
  public expensesPieChart: any;
  public incomePieChart: any;
  expensesPieChartArray: any[] = [];
  incomePieChartArray: any[] = [];

  date: Date = new Date();


  handleNextPage(object: any){


    console.log(object.currentPage)
     
    const currentPage = object.currentPage;
    const isNext = object.isNext;    

 

    isNext
      ? (this.currentPage = currentPage + 1)
      : (this.currentPage = currentPage - 1);

      // this.pageNumber = this.currentPage
      
      if (this.currentPage <1){
        this.currentPage = 1
      }
      if (this.currentPage >this.totalPages){
        this.currentPage = this.totalPages
      }
      this.transactionService
      .getTransactions(
        this.currentUserId,
        this.date.getMonth() + 1,
        this.date.getFullYear(),
        this.pageSize,
        this.currentPage
      )
      .subscribe((res) => {
        //SET transactions
        this.transactions = res;
        //GET number of pages
        this.countTotalPages();
      });
    
    


  }

  handleNextMonth(object: any) {
    const date = object.date;
    const isNext = object.isNext;
    const currentDate = new Date(date);
    this.currentPage=1
    // this.pageNumber = 1
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
    // GET transactions
    this.transactionService
      .getTransactions(
        this.currentUserId,
        this.date.getMonth() + 1,
        this.date.getFullYear(),
        this.pageSize,
        this.currentPage
      )
      .subscribe((res) => {
        //SET transactions
        this.transactions = res;
        //GET number of pages
        this.countTotalPages();
      });

       //-------------------START: Fetch Monthly Transactions For PieChart (Unpaginated data) ----------------------//
       this.transactionService
       .getTransactions(
         this.currentUserId,
         this.date.getMonth() + 1,
         this.date.getFullYear(),
         10000, //use a high page size to fetch all data
         this.currentPage
       )
       .subscribe((res) => {
         this.transactionsPieChart = res;
         this.createCharts(this.transactionsPieChart);
       });

     //-------------------END: Fetch Monthly Transactions For PieChart (Unpaginated data) ----------------------//
  }

  public toggleForm(): void {
    console.log('toggle');
    this.openForm = !this.openForm;
  }

  public handleAddTransaction(): void {
     
    console.log("handealletransaction")
    this.transactionService
    .getTransactions(
      this.currentUserId,
      this.date.getMonth() + 1,
      this.date.getFullYear(),
      10000, //use a high page size to fetch all data
      this.currentPage
    )
    .subscribe((res) => {
      this.transactionsPieChart = res;
      this.createCharts(this.transactionsPieChart);
    });
  }

  constructor(
    private transactionService: TransactionService,
    private cognitoService: CognitoService,
    private userService: UserService
  ) {
    this.transactions = [] as IGET_Transaction[];
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
          this.currentPage
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
          this.currentPage
        )
        .subscribe((res) => {
          this.transactionsPieChart = res;
          this.createCharts(this.transactionsPieChart);
        });

      //-------------------END: Fetch Monthly Transactions For PieChart (Unpaginated data) ----------------------//
    });
  }

  public createCharts(transactions: IGET_Transaction[]) {
    //Create Expenses Pie Chart
    this.expensesPieChart = this.formatData(transactions, 1);
    //Create Income Pie Chart
    this.incomePieChart = this.formatData(transactions, 2);
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
