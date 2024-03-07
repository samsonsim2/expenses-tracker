import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CognitoService, IUser } from '../../services/cognito.service';
import { Router } from '@angular/router';
import { CategoryService, ICategory } from '../../services/category.service';
import { NgForm } from '@angular/forms';
import { IGET_Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @Input() currentUserId: number;

  @Input() categories: ICategory[];

  category: ICategory = {
    name: '',
    color: '#EC407A',
    incomeExpenseId: 1,
  } as ICategory;

  constructor(private categoryService: CategoryService) {}

  public createCategory(form: NgForm) {
    this.categoryService
      .createCategory(this.category, this.currentUserId)
      .subscribe((res) => {});
    this.categories.push(this.category);
    //reset
    this.clearCategory();
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
