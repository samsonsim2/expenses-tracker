import { Component, Input } from '@angular/core';
import { IGET_Transaction } from '../../services/transaction.service';
 
@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  @Input() transaction: IGET_Transaction;
}
