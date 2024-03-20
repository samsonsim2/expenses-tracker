import { Component } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
import { UserService } from '../../services/user.service';
import { IUserDTO } from '../../services/user.service';
import { monthNames, multi } from '../../data/data';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent {
  user: IUserDTO;
  currentUserId: number;
  firstName: string;
  lastName: string;

  barChart: any = [];
  tempChart: any = [];
  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();

  constructor(
    private cognitoService: CognitoService,
    private userService: UserService,
    private transactionService: TransactionService
  ) {
    Object.assign(this, { multi });
  }

  clickNext(isNext: boolean) {
    if (isNext) {
      this.currentMonth += 1;
    } else {
      this.currentMonth -= 1;
    }

    let previousFourMonths: string[] = this.getPreviousFourMonths(
      this.currentMonth,
      this.currentYear
    );

    this.tempChart = previousFourMonths;

    this.getMonthlyTransactions();
  }

  async ngOnInit() {
    await this.setUserProperties();
  }

  public async setUserProperties() {
    const user = await this.cognitoService.getUser();
    console.log(user);
    const userDTO = {
      AmazonUsername: user.username,
      Email: user.attributes.email,
      FirstName: user.attributes.given_name,
      LastName: user.attributes.family_name,
      ImageUrl: '',
      MainCurrency: '',
    };
    const userObject = await this.userService
      .findOrCreateUser(userDTO)
      .subscribe((res) => {
        console.log(res);
      });

    this.userService.getUserByUsername(user.username).subscribe((res) => {
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.currentUserId = res.id;

      let previousFourMonths: string[] = this.getPreviousFourMonths(
        this.currentMonth,
        this.currentYear
      );

      this.tempChart = previousFourMonths;
      this.getMonthlyTransactions();
    });

    this.user = {
      AmazonUsername: user.username,
      Email: user.attributes.email,
      FirstName: user.attributes.given_name,
      LastName: user.attributes.family_name,
      ImageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/f/f4/Grey_square_500px_standard_background_colour.jpg?20200610144250',
      MainCurrency: 'SGD',
    };
  }

  public getPreviousFourMonths(
    currentMonth: number,
    currentYear: number
  ): Array<string> {
    // Create a Date object for the current date
    const currentDate: Date = new Date(currentYear, currentMonth - 1, 1);

    // Initialize an array to store the results
    const previousMonths: any = [];

    // Include the current month and year
    previousMonths.push({
      name: `${this.formatDate(currentDate)}`,
      series: [],
    });

    // Loop to calculate the previous four months
    for (let i = 0; i < 4; i++) {
      // Subtract one month from the current date
      currentDate.setMonth(currentDate.getMonth() - 1);

      // Append the previous month and year to the array
      previousMonths.unshift({
        name: `${this.formatDate(currentDate)}`,
        series: [],
      });
    }

    return previousMonths;
  }

  public formatDate(date: Date): string {
    return monthNames[date.getMonth()] + ' ' + date.getFullYear();
  }

  public getMonthlyTransactions() {
    this.transactionService
      .getMonthlyExpenseSum(this.currentUserId)
      .subscribe((expense: any) => {
        this.transactionService
          .getMonthlyIncomeSum(this.currentUserId)
          .subscribe((income: any) => {
            for (let i in expense) {
              for (let j of this.tempChart) {
                if (i == j.name) {
                  j.series.push({ name: 'Expense', value: expense[i] });
                }
              }
            }
            for (let i in income) {
              for (let j of this.tempChart) {
                if (i == j.name) {
                  j.series.push({ name: 'Income', value: income[i] });
                }
              }
            }
            this.renderChart();
          });
      });
  }

  public renderChart() {
    this.barChart = this.tempChart;
  }
}
