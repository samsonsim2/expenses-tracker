import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ITransaction,
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
  @Input() currentUserId: number = 0;
  @Input() transactions: ITransaction[] = [];
  @Input() transaction: ITransaction;
  @Input() transactionsPieChart: ITransaction[];

  @Output() onCloseForm = new EventEmitter();
  @Output() onAddTransaction = new EventEmitter();

  ngOnInit() {
    this.resetTransaction();
  }
  closeForm() {
    this.onCloseForm.emit();
  }

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  public createTransaction(form: NgForm) {
    const payload = this.transaction
    this.onAddTransaction.emit(payload)

  
  }

  public getCategoryColor() {}

  public resetTransaction() {
    this.transaction = {
      id:1,
      name: '',
      amount: 1,
      date: new Date().toISOString(),
      categoryId: 1,
      userId: this.currentUserId,
      categoryColor: '',
      categoryName: '',
      categoryIncomeExpenseId: '1',
    };
  }
}
