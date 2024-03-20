import { Component, Input } from '@angular/core'; 
import { CategoryService, ICategory } from '../../services/category.service';
import { NgForm } from '@angular/forms';
 
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @Input() currentUserId: number;

  @Input() categories: ICategory[];

  incomeExpense = [
    {value: '1', viewValue: 'Expense'},
    {value: '2', viewValue: 'Income'},
     
  ];

  category: ICategory = {
    name: '',
    color: '#EC407A',
    incomeExpenseId: 1,
  } as ICategory;

  selected = 'option2';

  constructor(private categoryService: CategoryService) {}

  public createCategory(form: NgForm) {
    console.log(`hihi ${this.currentUserId}`)
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
