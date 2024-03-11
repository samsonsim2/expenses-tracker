import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
   

  showFiller = false;
  canShowHeader = false ;

  constructor(private router: Router) {
    this.router.events.subscribe( (val: any) => {    
      console.log(this.router.url)  
     this.showHeader(this.router.url)
    });
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
