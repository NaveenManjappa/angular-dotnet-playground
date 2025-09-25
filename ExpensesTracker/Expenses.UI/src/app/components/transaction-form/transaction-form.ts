import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction';

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
    'Entertainment',
    'Car'
  ];

  availableCategories:string[] = [];
  editMode=false;
  transactionId?:number;

  fb:FormBuilder = inject(FormBuilder);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  transactionService:TransactionService = inject(TransactionService);
  
  constructor(){
    this.transactionForm = this.fb.group({
      type:['Expense',Validators.required],
      category:['',Validators.required],
      amount:['',[Validators.required,Validators.min(0)]],
      createdAt:[new Date(),Validators.required]
    });
  }
  ngOnInit(): void {
     this.updateAllAvailableCategories(this.transactionForm.get('type')?.value);
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.editMode =true;
      this.transactionId = +id;
      this.loadTransaction(this.transactionId);
    }
   
    
  }

  cancel(){
    this.router.navigate(['/transactions']);
  }

  onSubmit(){
    if(this.transactionForm.valid){
      const transaction = this.transactionForm.value;
      console.log(transaction);
      if(this.editMode && this.transactionId){
        this.transactionService.update(this.transactionId,transaction).subscribe({
          next:(transaction) => {
            this.router.navigate(['/transactions'])
          },
          error:(error) => {
            console.log('Error',error);
          }
        })
      }
      else {
        this.transactionService.create(transaction).subscribe({
          next: (transaction) => {
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.log('Error:', error);
          }
        });
      }
      
    }
  }

  onTypeChange(){ 
       
    this.updateAllAvailableCategories(this.transactionForm.get('type')?.value);
  }

  updateAllAvailableCategories(type:string){
    
    this.availableCategories = type === 'Expense' ? this.expenseCategories : this.incomeCategories;
    this.transactionForm.patchValue({category:''});
  }

  loadTransaction(id:number):void {
    this.transactionService.getById(id).subscribe({
      next:(transaction) =>{
        console.log('load',transaction);
        this.updateAllAvailableCategories(transaction.type);
        this.transactionForm.patchValue({
          type:transaction.type,
          category:transaction.category,
          amount:transaction.amount
        });
        
      },
      error:(error) => {
        console.log('Error:',error);
      }
    })
  }

}
