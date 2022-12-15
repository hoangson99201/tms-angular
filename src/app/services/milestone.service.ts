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

  findAllByProjectId(projectId: number): Observable<Milestone[]> {
    return this._http.get<Milestone[]>("/tms/api/v1/project/" + projectId + "/milestone");
  }

  findByMilestoneId(milestoneId: number): Observable<Milestone> {
    return this._http.get<Milestone>("/tms/api/v1/milestone/" + milestoneId);
  }

  update(milestone: Milestone): Observable<string> {
    return this._http.put("/tms/api/v1/milestone", milestone, {
      responseType: 'text'
    });
  }
}
