import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = 'https://bb212102-2fab-4fae-9227-3b2b24cf1275.mock.pstmn.io/auth/api/login/';
  constructor(private http: HttpClient) { }

  login(data: any): Observable<any>{
    return this.http.post(this.loginUrl, data);
  }
}
