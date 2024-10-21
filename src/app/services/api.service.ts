import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api_url = 'http://localhost:3000/employess';

  constructor(private http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.api_url, data);
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.api_url);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api_url}/${id}`, data);
  }
  deleteEmployee(id: number): Observable<any> {
    // return this.http.delete(`this.api_url/${id}`);
    return this.http.delete(`${this.api_url}/${id}`); // Corrected URL
  }
}
