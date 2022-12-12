import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { PagingParams, PagingResponse } from '../core/base-paginator';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  getProjects(params: PagingParams): Observable<PagingResponse<Project>> {
    return this._http.get<PagingResponse<Project>>(`/tms/api/v1/project?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`);
  }

  addProject(project: Project): Observable<Project> {
    return this._http.post<Project>("/tms/api/v1/project", project);
  }

  findByProjectId(projectId: number): Observable<Project> {
    return this._http.get<Project>(`/tms/api/v1/project/${projectId}`);
  }
}
