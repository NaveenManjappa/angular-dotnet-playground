import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/authresponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  private apiUrl='https://localhost:7141/api/Auth'
  http:HttpClient = inject(HttpClient);
  router:Router=inject(Router);

  login(credentials:User):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,credentials)
                    .pipe(
                      tap(response => {
                        localStorage.setItem("token",response.token);
                      })
                    );
  }

  register(credentials:User):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`,credentials)
                    .pipe(
                      tap(response => {
                        localStorage.setItem("token",response.token);
                      })
                    );
  }

  logout():void {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
