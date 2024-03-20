import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Observable,of} from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';



export interface IUserDTO {
  
  AmazonUsername : string;
  Email: string;  
  FirstName: string;
  LastName: string;
  ImageUrl: string;
  MainCurrency: string;
}
@Injectable({
  providedIn: 'root'
})

 

export class UserService {

   

  constructor(private _http: HttpClient) { }

  

  getUsers():Observable<any>{
    const users =this._http.get("http://167.71.199.57:5000/api/User")
    return (users);
  }

  getUserByUsername(username:string):Observable<any>{
    const users =this._http.get(`https://localhost:5000/api/User/username?username=${username}`)
    return (users);
  }

  findOrCreateUser(userDTO: IUserDTO):Observable<any>{
    return  this._http.post("http://167.71.199.57:5000/api/User",userDTO )
  }

  updateUser(userId: number,userDTO: any):Observable<any>{
    const users =this._http.put(`https://localhost:5000/api/User?userId=${userId}`,userDTO)
    return (users);
  }

     

}
