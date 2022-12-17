import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>("/tms/api/v1/user");
  }

  create(user: User): Observable<string> {
    return this._http.post("/tms/api/v1/user", user, {
      responseType: 'text'
    });
  }

  update(user: User): Observable<string> {
    return this._http.put("/tms/api/v1/user", user, {
      responseType: 'text'
    });
  }
}
