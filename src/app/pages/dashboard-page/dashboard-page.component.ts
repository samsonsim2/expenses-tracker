import { Component } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
import { UserService } from '../../services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IUserDTO } from '../../services/user.service';
import { multi } from '../../data/data';
import { TransactionService } from '../../services/transaction.service';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent {
  finalBar: any;
  firstName: string;
  lastName: string;

  barChart: any = [
    {
      name: 'December 2023',
      series: [],
    },

    {
      name: 'January 2024',
      series: [],
    },

    {
      name: 'Febuary 2024',
      series: [],
    },
    {
      name: 'March 2024',
      series: [],
    },
  ];

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  showFiller = false;
  user: IUserDTO;
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

  clickNext(isNext:boolean) {
    if(isNext){
      this.currentMonth += 1;
    }else{
      this.currentMonth -= 1;
    }
   
    let previousFourMonths: string[] = this.getPreviousFourMonths(
      this.currentMonth,
      this.currentYear
    );

    this.tempChart = previousFourMonths;
    console.log(this.tempChart)

    this.transactionService
      .getMonthlyExpenseSum(2)
      .subscribe((expense: any) => {
        this.transactionService
          .getMonthlyIncomeSum(2)
          .subscribe((income: any) => {
            for (let i in expense) {
              console.log(i);
              for (let j of this.tempChart) {
                if (i == j.name) {
                  j.series.push({ name: 'Expense', value: expense[i] });
                }
              }
            }

            for (let i in income) {
              console.log(i);
              for (let j of this.tempChart) {
                if (i == j.name) {
                  j.series.push({ name: 'Income', value: income[i] });
                }
              }
            }
            this.barChart = this.tempChart;
          });
      });
  }

  async ngOnInit() {
    // get aws username of the user
    const user = await this.cognitoService.getUser();
    this.firstName = user.attributes.given_name
    this.lastName = user.attributes.family_name
    console.log(user);
    this.user = {
      AmazonUsername: user.username,
      Email: user.attributes.email,
      FirstName: user.attributes.given_name,
      LastName: user.attributes.family_name,
      ImageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/f/f4/Grey_square_500px_standard_background_colour.jpg?20200610144250',
      MainCurrency: 'SGD',
    };

    let previousFourMonths: string[] = this.getPreviousFourMonths(
      this.currentMonth,
      this.currentYear
    );

    this.tempChart = previousFourMonths;

    console.log(previousFourMonths);
    this.transactionService
      .getMonthlyExpenseSum(2)
      .subscribe((expense: any) => {
        this.transactionService
          .getMonthlyIncomeSum(2)
          .subscribe((income: any) => {
            for (let i in expense) {
              console.log(i);
              for (let j of this.tempChart) {
                if (i == j.name) {
                  j.series.push({ name: 'Expense', value: expense[i] });
                }
              }
            }

            for (let i in income) {
              console.log(i);
              for (let j of this.tempChart) {
                if (i == j.name) {
                  j.series.push({ name: 'Income', value: income[i] });
                }
              }
            }
            this.barChart = this.tempChart;
          });
      });

    const userId = this.userService
      .findOrCreateUser(this.user)
      .subscribe((res) => {
        console.log(res);
      });

    // this.createMonths();
  }
  date: Date = new Date();

  months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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
    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[date.getMonth()] + ' ' + date.getFullYear();
  }

  // createMonths() {
  //   let currentDate = new Date();

  //   let dateArray = [
  //     {
  //       name: `${
  //         this.months[currentDate.getMonth()]
  //       } ${currentDate.getFullYear()} `,
  //       series: [],
  //     },
  //   ];

  //   for (let i = 1; i < 4; i++) {
  //     let previousMonth = currentDate.getMonth() - i;
  //     let year = currentDate.getFullYear();;
  //     if (previousMonth < 0) {
  //       year = currentDate.getFullYear() - 1;
  //       previousMonth = 11
  //     }

  //     dateArray.push({
  //       name: `${
  //         this.months[previousMonth]
  //       } ${year}`,
  //       series: [],
  //     });
  //   }
  //   console.log(dateArray);
  // }
}
