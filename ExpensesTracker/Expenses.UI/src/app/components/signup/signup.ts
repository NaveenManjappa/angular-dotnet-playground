import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-signup',
  imports: [RouterLink,ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signUpForm:FormGroup;
  fb:FormBuilder=inject(FormBuilder);
  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);
  
  constructor() {
    this.signUpForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]],
      validators: this.passwordMatchValidator
    });
    
  }

  onSubmit():void{
    console.log(this.signUpForm.value);
    if(this.signUpForm.valid){
      this.authService.register(this.signUpForm.value)
      .subscribe({
        next:()=>{
          this.router.navigate(['/transactions']);
        },
        error:(error) => {
          console.log('Error',error);
        }
      })
    }
  }

  private passwordMatchValidator(fg:FormGroup){
    return fg.get('password')?.value === fg.get('confirmPassword')?.value 
    ? null:
      { passwordMismatch:true}
  }
}
