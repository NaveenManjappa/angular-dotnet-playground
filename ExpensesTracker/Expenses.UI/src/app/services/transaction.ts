import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Transaction {
  private apiUrl='https://localhost:7145/api/transactions/'
  constructor(private http:HttpClient){

  }

  getAll():Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl+"all");
  }

  getById(id:number):Observable<Transaction>{
    return this.http.get<Transaction>(this.apiUrl+"/Details/"+id);
  }

  create(transaction:Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl+"/Create",transaction);
  }

  update(id:number,transaction:Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl+"/Update/"+id,transaction);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(this.apiUrl+"/Delete/"+id);
  }
}
