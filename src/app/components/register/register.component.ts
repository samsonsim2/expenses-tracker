import { Component } from '@angular/core';
import { CognitoService, IUser } from '../../services/cognito.service';
import { Router } from '@angular/router';
import { Amplify, Auth } from 'aws-amplify';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isConfirm: boolean;
  user: IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp() {
    this.cognitoService
      .signUp(this.user)
      .then(() => {
        console.log('signup');
        this.isConfirm = true;
      })
      .catch(() => {
        console.log('something went wrong with sign up');
      });
  }

  public confirmSignUp() {
    this.cognitoService
      .confirmSignUp(this.user)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(() => {
        console.log('something went wrong with confirm sign up');
      });
  }
}
