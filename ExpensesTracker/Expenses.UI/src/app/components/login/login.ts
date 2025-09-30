import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
loginForm:FormGroup;
  errorMsg:string | null = null;

  fb:FormBuilder=inject(FormBuilder);
  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);
  
  constructor() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]   
    });
    
  }

  hasError(controlName:string,errorName:string):boolean {
    const control = this.loginForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }
  onSubmit():void{
    console.log(this.loginForm.value);
    this.errorMsg=null;
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
      .subscribe({
        next:()=>{
          this.router.navigate(['/transactions']);
        },
        error:(error) => {
          console.log('Error',error);
          this.errorMsg=error.error || 'An error occured during login. Please try again'
        }
      })
    }
  }

  
}
