import { Component, Input } from '@angular/core';
import { CognitoService, IUser } from '../../services/cognito.service';
import { Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { UserService } from '../../services/user.service';
 
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  @Input() currentUser :any
  @Input() currentUserId :any
  public user: IUser;



  constructor(private router: Router, private cognitoService: CognitoService,private userService: UserService) {
    this.user = {} as IUser;
    
     
  }

  public updateUser(currentUserId:any,currentUser:any){
  let test = {
    
    "amazonUsername":currentUser.amazonUsername,
    "firstName": currentUser.firstName,
    "lastName": currentUser.lastName,
    "email": currentUser.email,
    "imageUrl": currentUser.imageUrl,
    "mainCurrency": currentUser.mainCurrency,
   
}
     console.log(currentUser)
    const user = this.userService.updateUser(2,test).subscribe((res=>{
      console.log(res)
    }))
    // return user

    // "amazonUsername": "5b3333b7-8fde-4fdc-bad1-3a5ac0d412b7",
    //   "firstName": "stringddd",
    //   "lastName": "strdsidsadang",
    //   "email": "samsonsim2@proton.me",
    //   "imageUrl": "string",
    //   "mainCurrency": "string",
  }
}
