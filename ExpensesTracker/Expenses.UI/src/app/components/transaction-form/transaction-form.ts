import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionForm implements OnInit{
  transactionForm:FormGroup;
  incomeCategories = [
    'Salary',
    'Freelance',
    'Investment'
  ];
  expenseCategories = [
    'Food',
    'Transportation',
    'Entertainment'
  ];

  availableCategories:string[] = [];

  fb:FormBuilder = inject(FormBuilder);
  
  constructor(){
    this.transactionForm = this.fb.group({
      type:['Expense',Validators.required],
      category:['',Validators.required],
      amount:['',Validators.required,Validators.min(0)],
      createdAt:[new Date(),Validators.required]
    });
  }
  ngOnInit(): void {
    const type = this.transactionForm.get('type')?.value;
    this.availableCategories = type === 'Expense' ? this.expenseCategories : this.incomeCategories;
    this.transactionForm.patchValue({category:''});
  }

  cancel(){

  }
  onSubmit(){

  }
  onTypeChange(){
    
  }

}
