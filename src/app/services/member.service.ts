import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectUser } from '../models/projectUser';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _http: HttpClient) { }

  findAllByProjectId(projectId: number): Observable<ProjectUser[]> {
    return this._http.get<ProjectUser[]>("/tms/api/v1/project/" + projectId + "/project-user");
  }

  delete(projectUserId: number): Observable<{ deletedCount: number }> {
    return this._http.delete<{ deletedCount: number }>("/tms/api/v1/project-user/" + projectUserId);
  }
}
