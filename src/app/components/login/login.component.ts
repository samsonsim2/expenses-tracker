import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = ""
  password: string = ""



  signIn(){
    console.log(this.username,this.password)


  }

}
