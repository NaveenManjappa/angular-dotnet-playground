import { Component } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';

'@angular/common';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionList {
  transactions:Transaction[] = [
    {
      id: 1,
      type: 'expense',
      category: 'Groceries',
      amount: 50.00,
      createdAt: new Date('2025-09-22'),
      updatedAt: new Date('2025-09-22')
    },
    {
      id: 2,
      type: 'income',
      category: 'Salary',
      amount: 2000.00,
      createdAt: new Date('2025-09-20'),
      updatedAt: new Date('2025-09-20')
    }
  ];
}

