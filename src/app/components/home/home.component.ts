import { Component } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private cognitoService: CognitoService) {}

  public ngOnInit(): void {
    console.log(this.cognitoService.getUser());
  }
}
