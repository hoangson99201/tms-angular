import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Milestone } from '../models/milestone';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  constructor(private _http: HttpClient) { }

  addMilestone(milestone: Milestone): Observable<string> {
    return this._http.post("/tms/api/v1/milestone", milestone, {
      responseType: 'text'
    });
  }
}
