import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface ICategory {
  id: number;
  name: string;
  color: string;
  incomeExpenseId: number;
  defaultCategory: boolean;
  
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  createCategory(category: ICategory,userId: number): Observable<any> {
    return this._http.post(`https://localhost:5000/api/Category?userId=${userId}`, category);
  }

  getCategories(): Observable<any> {
    const categories = this._http.get('https://localhost:5000/api/Category');
    return categories;
  }

  getCategoryById(categoryId:number): Observable<any> {
    const category = this._http.get(`https://localhost:5000/api/Category/${categoryId}`);
    return category;
  }
  getCategoriesByUserId(userId:number): Observable<any> {
    const categories = this._http.get(`https://localhost:5000/api/Category/userId/${userId}`);
    return categories;
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this._http.delete(
      `http://167.71.199.57:5000/api/Category/${categoryId}`
    );
  }
}
