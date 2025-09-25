import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction';
import { Router } from '@angular/router';

'@angular/common';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionList implements OnInit {
  
  transactionService = inject(TransactionService);
  router:Router=inject(Router);

  transactions:Transaction[] = [];  

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions():void {
    this.transactionService.getAll().subscribe(data => this.transactions=data);
  }

  getTotalIncome():number {
    return this.transactions.filter(t => t.type === 'Income').reduce((sum,t) => sum+t.amount,0);
  }

  getTotalExpense():number {
    return this.transactions.filter(t => t.type === 'Expense').reduce((sum,t) => sum + t.amount,0);
  }

  getNetBalance():number {
    return this.getTotalIncome() -  this.getTotalExpense();
  }

  editTransaction(transaction:Transaction){
    if(transaction.id){
      this.router.navigate(['/edit',transaction.id])
    }
  }
}

