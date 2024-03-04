import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface IPOST_Transaction {
  
  name: string;
  amount: number;
  date: string;
  categoryId: number;
  userId:number;
 

}

export interface IGET_Transaction {
  
  name: string;
  amount: number;
  date: string;
  userId:number;
  categoryId: number;
  categoryName: string;
  categoryColor:string;
  categoryIncomeExpenseId: string

}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private _http: HttpClient) {}

  createTransaction(transaction: IGET_Transaction): Observable<any> {
    return this._http.post('https://localhost:5000/api/Transaction', transaction);
  }

  getTransactions(currentUserId:number,month:number,year:number,pageSize:number,pageNumber:number): Observable<any> {
    const categories = this._http.get(`https://localhost:5000/api/Transaction/userId?id=${currentUserId}&month=${month}&year=${year}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
    return categories;
  }

  countTransactionPages(currentUserId:number,month:number,year:number,pageSize:number ): Observable<any> {
    const totalPages = this._http.get(`https://localhost:5000/api/Transaction/userId/pageCount?id=${currentUserId}&month=${month}&year=${year}&pageSize=${pageSize}`);
    return  totalPages ;
  }

   
}
