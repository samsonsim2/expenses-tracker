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
  ITransaction,
} from '../../services/transaction.service';
import { UserService } from '../../services/user.service';
import { CognitoService } from '../../services/cognito.service';
import { map, switchMap } from 'rxjs';
import { CategoryService, ICategory } from '../../services/category.service';
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

  //Request items
  currentUserId: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;
  categories: ICategory[];

  //Response

  public transactions: ITransaction[] = [];
  public transactionsPieChart: ITransaction[] = [];
  public expensesPieChart: any;
  public incomePieChart: any;

  //misc
  openForm: boolean = false;
  date: Date = new Date();

  //pass down
  public expensesColor : any=[]
  public incomeColor : any=[]
  public transaction = {
    name: '',
    amount: 0,
    date: '',
    userId: this.currentUserId,
    categoryId: 0,
    categoryName: '',
    categoryColor: '',
    categoryIncomeExpenseId: '',
  };
  public incomeLoading: boolean = true
  public expensesLoading: boolean = true
  constructor(
    private transactionService: TransactionService,
    private cognitoService: CognitoService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {
    this.transaction = {
      name: '',
      amount: 1,
      date: '',
      userId: this.currentUserId,
      categoryId: 1,
      categoryName: '',
      categoryColor: '',
      categoryIncomeExpenseId: '',
    };
  }

  public async ngOnInit() {
    //Get user
    const user = await this.cognitoService.getUser();
    this.userService.getUserByUsername(user.username).subscribe((res) => {
      this.currentUserId = res.id; //set current user
      this.getTransactionsByPage(); //for list
      this.getWholeMonthTransactions(); //for pie chart
      this.getUserCategories(this.currentUserId)// for categories list in transaction form 
 
     

    });

   
  }

  handleNextPage(object: any) {
    const currentPage = object.currentPage;
    const isNext = object.isNext;

    isNext
      ? (this.currentPage = currentPage + 1)
      : (this.currentPage = currentPage - 1);

    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.getTransactionsByPage();
  }
  getUserCategories(currentUserId:number)
  {
    this.categoryService.getCategoriesByUserId(1).subscribe((res): void => {
      let newList = [...res]        
      this.categoryService.getCategoriesByUserId(2).subscribe((res) => {
        newList.push(...res);
        this.categories=newList;
      });
    });


  }
  handleNextMonth(object: any) {
    const date = object.date;
    const isNext = object.isNext;
    const currentDate = new Date(date);
    this.currentPage = 1;
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
    this.getTransactionsByPage();
    this.getWholeMonthTransactions();

  }

  public toggleForm(): void {
    console.log('toggle');
    this.openForm = !this.openForm;
  }

  public handleAddTransaction(object: any): void {
    this.categoryService.getCategoryById(object.categoryId).subscribe((res) => {
      object.categoryColor = res.color;
      object.categoryName = res.name;

      if (this.transactions.length < 10) {
        this.transactions.push(object);
      }
      this.transactionService.createTransaction(object).subscribe((res) => {
        this.getTransactionsByPage();
        this.getWholeMonthTransactions();
      });

      this.resetTransaction();
    });
  }

  public deleteTransaction(object: any) {
    this.transactionService
      .deleteTransaction(object.transactionId)
      .subscribe((res) => {
        let newList = this.transactions.filter((res) => {
          return res.id != object.transactionId;
        });

        this.transactions = newList;

        this.getWholeMonthTransactions();
      });
  }

  public resetTransaction() {
    this.transaction = {
      name: '',
      amount: 1,
      date: new Date().toISOString(),
      categoryId: 1,
      userId: this.currentUserId,
      categoryColor: '',
      categoryName: '',
      categoryIncomeExpenseId: '1',
    };
  }

  public getTransactionsByPage() {
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
        this.setTotalPages();
      });
  }

  public   getWholeMonthTransactions() {
 
      console.log('getting whole month transactions');
      this.transactionService
        .getTransactions(
          this.currentUserId,
          this.date.getMonth() + 1,
          this.date.getFullYear(),
          10000, //use a high page size to fetch all data
          this.currentPage
        )
        .subscribe((res) => {
          this.formatColor(res)
          this.transactionsPieChart = res;
          this.createCharts(this.transactionsPieChart);})
 
  
  }

  //sends data to chart
  public createCharts(transactions: ITransaction[]) {
    //Create Expenses Pie Chart
    this.expensesPieChart = this.formatData(transactions, 1);
    if(this.expensesPieChart.length > 0){
      this.expensesLoading = false
    }else{
      this.expensesLoading  = true
    }
    console.log(this.expensesPieChart)
    //Create Income Pie Chart
    this.incomePieChart = this.formatData(transactions, 2);

    if(this.incomePieChart.length > 0){
      this.incomeLoading = false
    }else{
      this.incomeLoading  = true
    }
    console.log(this.incomePieChart)
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

  public formatColor(transactions: ITransaction[]) {
    
    const formattedExpensesColor = transactions
    .filter((t: any) => t.categoryIncomeExpenseId == 1)
    .map((t: any) => {
      return { name: t.categoryName, value: t.categoryColor };
    })

    const formattedIncomeColor = transactions
    .filter((t: any) => t.categoryIncomeExpenseId == 2)
    .map((t: any) => {
      return { name: t.categoryName, value: t.categoryColor };
    })

    this.expensesColor = formattedExpensesColor
    this.incomeColor= formattedIncomeColor
    console.log(this.expensesColor)

 
   
     
  }

  //counts total pages of transactions per month
  public setTotalPages() {
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
