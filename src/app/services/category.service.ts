import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface ICategory {
  id: number;
  name: string;
  color: string;
  incomeExpenseId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  createCategory(category: ICategory): Observable<any> {
    return this._http.post('http://167.71.199.57:5000/api/Category', category);
  }

  getCategories(): Observable<any> {
    const categories = this._http.get('http://167.71.199.57:5000/api/Category');
    return categories;
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this._http.delete(
      `http://167.71.199.57:5000/api/Category/${categoryId}`
    );
  }
}
