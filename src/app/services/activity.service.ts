import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private _http: HttpClient) { }

  findAllByProjectId(projectId: number): Observable<Activity[]> {
    return this._http.get<Activity[]>("/tms/api/v1/project/" + projectId + "/activity");
  }
}
