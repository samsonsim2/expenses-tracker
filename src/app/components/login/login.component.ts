import { Component } from '@angular/core';
import { CognitoService, IUser } from '../../services/cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.user = {} as IUser;
  }

  public signIn(): void {
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(() => {
        console.log('something bad happened on sign in ');
      });
  }
}
