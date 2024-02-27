import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IGET_Transaction,
  TransactionService,
} from '../../services/transaction.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  @Input() currentUserId: number;
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

  constructor(private transactionService: TransactionService ) {
    function formatISODate(date: Date): string {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

     

  }

  public createTransaction(form: NgForm) {
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
  }
}
