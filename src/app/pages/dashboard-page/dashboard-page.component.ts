import { Component } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
import { UserService } from '../../services/user.service';

import {
  IUserDTO
} from '../../services/user.service';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent {
  showFiller = false;
  user:IUserDTO;

  constructor(
    private cognitoService: CognitoService,
    private userService: UserService
  ) {}
  async ngOnInit() {
    // get aws username of the user
    const user = await this.cognitoService.getUser();
    console.log(user)
    this.user={
      AmazonUsername : user.username,
      Email: user.attributes.email,  
      FirstName: user.attributes.given_name,
      LastName: user.attributes.family_name,
      ImageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Grey_square_500px_standard_background_colour.jpg?20200610144250",
      MainCurrency: "SGD"
    }

    console.log(this.user)
 
    const userId = this.userService
      .findOrCreateUser(this.user)
      .subscribe((res) => {
         console.log(res)
      });
  }
}
