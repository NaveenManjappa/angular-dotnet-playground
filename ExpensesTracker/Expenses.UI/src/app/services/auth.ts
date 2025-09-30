import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/authresponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl='https://localhost:7141/api/Auth';
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(){
    const token = localStorage.getItem("token");
    if(token)
      this.currentUserSubject.next('user');
  }
  http:HttpClient = inject(HttpClient);
  router:Router=inject(Router);

  login(credentials:User):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,credentials)
                    .pipe(
                      tap(response => {
                        localStorage.setItem("token",response.token);
                        this.currentUserSubject.next('user');
                      })
                    );
  }

  register(credentials:User):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`,credentials)
                    .pipe(
                      tap(response => {
                        localStorage.setItem("token",response.token);
                        this.currentUserSubject.next('user');
                      })
                    );
  }

  logout():void {
    localStorage.removeItem("token");
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem("token");
  }
}
