import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from './services/cognito.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
   

  showFiller = false;
  canShowHeader = false ;

  constructor(private router: Router,private cognitoService:CognitoService) {
    this.router.events.subscribe( (val: any) => {    
      console.log(this.router.url)  
     this.showHeader(this.router.url)
    });
  }

  public signOut(){
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/']);
    })
    .catch(() => {
      console.log('something went wrong with confirm sign up');
    });
    console.log("signout")
  }
 
  showHeader(url: string) {     
    if(url != '/'){
      console.log('hide header')
      this.canShowHeader = false
    }else{
      this.canShowHeader= true
    }
    
   }
}
