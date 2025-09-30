import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth";

export const authInterceptor:HttpInterceptorFn = (req,next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if(token){
    console.log('Cloning');
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    })
  }
  console.log(req);
  return next(req);

}