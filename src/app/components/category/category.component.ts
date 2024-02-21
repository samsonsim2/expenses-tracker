import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CognitoService, IUser } from '../../services/cognito.service';
import { Router } from '@angular/router';
import { CategoryService, ICategory } from '../../services/category.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  public categories: ICategory[];

  color: string = '#EC407A';

  category: ICategory;
  

  constructor(private categoryService: CategoryService) {
    this.categories = [] as ICategory[];
    this.category = {
      name: '',
      color: '#EC407A',
      incomeExpenseId: 1,
    } as ICategory;
  }

  public ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    });
  }

  public createCategory(form: NgForm) {
    this.categoryService.createCategory(this.category).subscribe((res) => {});
    this.categories.push(this.category);

    this.category = {
      name: '',
      color: '#EC407A',
      incomeExpenseId: 0,
    } as ICategory;
  }

  public clearCategory() {
    this.category = {
      name: '',
      color: '#EC407A',
      incomeExpenseId: 0,
    } as ICategory;
  }

  public deleteCategory(category: ICategory) {
    this.categoryService.deleteCategory(category.id).subscribe(() => {
      this.categories = this.categories.filter((c) => {
        return c.id !== category.id;
      });
    });
  }
}
