import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from '../models/priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(private _http: HttpClient) { }

  findAll(): Observable<Priority[]> {
    return this._http.get<Priority[]>("/tms/api/v1/priority");
  }
}
