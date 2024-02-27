import { Component } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent {
  showFiller = false;

  constructor(
    private cognitoService: CognitoService,
    private userService: UserService
  ) {}
  async ngOnInit() {
    // // get aws username of the user
    // const user = await this.cognitoService.getUser();
    // // find the userId using the aws username
    // const userId = this.userService
    //   .getUserByUsername(user.username)
    //   .subscribe((res) => {
    //     console.log(res.id);
    //   });
  }
}
