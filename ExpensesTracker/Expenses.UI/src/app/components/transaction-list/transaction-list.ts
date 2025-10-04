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

  /**
   * Angular lifecycle hook called after component construction.
   * Initializes the component by loading the transaction list.
   * This method delegates to {@link loadTransactions} to fetch data.
   */
  

  loadTransactions():void {
    this.transactionService.getAll().subscribe(data => this.transactions=data);
  }

  /**
   * Fetches all transactions from the server and stores them on the
   * local `transactions` array.
   *
   * Uses the injected {@link TransactionService#getAll} which returns an
   * Observable; we subscribe and assign the received data. Errors are not
   * handled here (left to the service or global interceptor) — callers may
   * extend this to display UI feedback on error.
   */

  getTotalIncome():number {
    return this.transactions.filter(t => t.type === 'Income').reduce((sum,t) => sum+t.amount,0);
  }

  /**
   * Calculates the total income across all loaded transactions.
   *
   * Iterates over `transactions`, filters those with `type === 'Income'`,
   * and returns the sum of their `amount` values. Returns 0 when there are
   * no income transactions.
   *
   * @returns number total income
   */

  getTotalExpense():number {
    return this.transactions.filter(t => t.type === 'Expense').reduce((sum,t) => sum + t.amount,0);
  }

  /**
   * Calculates the total expense across all loaded transactions.
   *
   * Iterates over `transactions`, filters those with `type === 'Expense'`,
   * and returns the sum of their `amount` values. Returns 0 when there are
   * no expense transactions.
   *
   * @returns number total expenses
   */

  getNetBalance():number {
    return this.getTotalIncome() -  this.getTotalExpense();
  }

  /**
   * Computes the net balance by subtracting total expenses from total income.
   *
   * This calls {@link getTotalIncome} and {@link getTotalExpense} so it will
   * reflect the currently loaded `transactions`.
   *
   * @returns number net balance (income - expenses)
   */

  editTransaction(transaction:Transaction){
    if(transaction.id){
      this.router.navigate(['/edit',transaction.id])
    }
  }

  /**
   * Navigate to the edit page for a transaction.
   *
   * If the provided transaction has a valid `id`, this method navigates to
   * the `/edit/:id` route using the injected {@link Router}. If `id` is
   * missing or falsy, no navigation occurs.
   *
   * @param transaction The transaction to edit. Must contain an `id` to navigate.
   */

  
  deleteTransaction(transaction:Transaction){
    if(transaction.id){
      if(confirm("Are you sure you want to delete the transaction?")){
        this.transactionService.delete(transaction.id).subscribe({
          next:() => {
            this.loadTransactions();
          },
          error:(error) => {
            console.log('Error',error);
          }
        })
      }
    }
  }
}

