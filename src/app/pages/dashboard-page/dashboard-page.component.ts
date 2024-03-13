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
  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  showFiller = false;
  user: IUserDTO;

  constructor(
    private cognitoService: CognitoService,
    private userService: UserService,
    private transactionService: TransactionService
  ) {
    Object.assign(this, { multi });
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  async ngOnInit() {
    // get aws username of the user
    const user = await this.cognitoService.getUser();
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

    const test = this.transactionService.getMonthlyExpenseSum(2).subscribe((res)=>console.log(res))
    console.log(test)
    console.log(this.user);

    const userId = this.userService
      .findOrCreateUser(this.user)
      .subscribe((res) => {
        console.log(res);
      });
  }
  
}
