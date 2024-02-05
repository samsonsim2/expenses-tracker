import { Component } from '@angular/core';
import { CognitoService } from '../../services/cognito.service';
import { IUserDTO, UserService } from '../../services/user.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  userDTO : IUserDTO;
  public users:any;
  constructor(private cognitoService: CognitoService,private userService: UserService ) {
    this.userDTO = {} as  IUserDTO;
  }

  
  public ngOnInit(): void {

    this.cognitoService.getUser().then((res)=>{
       
      this.userDTO.AmazonUsername=res.username
      this.userDTO.Email = res.attributes.email
      this.userDTO.FirstName=res.attributes.family_name
      this.userDTO.LastName=res.attributes.given_name
      this.userDTO.MainCurrency="SGD"
      this.userDTO.ImageUrl="https://www.google.com/url?sa=i&url=https%3A%2F%2Fnwuc.edu.zm%2Fhome%2Fsquare-500x500-dark-grey%2F&psig=AOvVaw1emz5O1m1DmzeNaerq1XAN&ust=1706199321570000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCIiklfO19oMDFQAAAAAdAAAAABAI"
      
     
      this.userService.findOrCreateUser(this.userDTO).subscribe((res)=> console.log(res))
    })
     
    this.userService.getUsers().subscribe((res)=> console.log(res))
     

  }
}
