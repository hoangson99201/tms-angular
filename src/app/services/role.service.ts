import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }

  findAll(): Observable<Role[]> {
    return this._http.get<Role[]>("/tms/api/v1/role");
  }
}
