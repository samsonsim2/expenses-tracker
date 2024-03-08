import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IGET_Transaction,
  TransactionService,
} from '../../services/transaction.service';
import { NgForm } from '@angular/forms';
import { CategoryService, ICategory } from '../../services/category.service';
@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  @Input() currentUserId: number;
  @Input() transactions: IGET_Transaction[];
  public transaction: IGET_Transaction;
  @Output() onCloseForm = new EventEmitter();


  ngOnInit() {
    console.log(this.currentUserId);

    this.transaction = {
      name: 'test',
      amount: 10,
      date: new Date().toISOString(),
      categoryId: 1,
      userId: this.currentUserId,
      categoryColor: '',
      categoryName: '',
      categoryIncomeExpenseId: '1',
    };
  }
  closeForm() {
    this.onCloseForm.emit();
  }

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {
    function formatISODate(date: Date): string {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }

  public createTransaction(form: NgForm) {
    this.addTransactionToList(this.transaction.categoryId);
    
  }

  public addTransactionToList(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe((res) => {
      this.transaction.categoryColor = res.color;
      this.transaction.categoryName = res.name;
      this.transactions.push(this.transaction);

      this.transactionService
        .createTransaction(this.transaction)
        .subscribe((res) => {});

      this.transaction = {
        name: 'test',
        amount: 10,
        date: new Date().toISOString(),
        categoryId: 1,
        userId: this.currentUserId,
        categoryColor: '',
        categoryName: '',
        categoryIncomeExpenseId: '1',
      };

      this.closeForm()
    });
  }
}
