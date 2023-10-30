import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public callGet<T>(url: string, httpParams?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params: httpParams });
  }

  public callPost<T>(url: string, body?: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  public callPut<T>(url: string, body?: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  public callDelete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
