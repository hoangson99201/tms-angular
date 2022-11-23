import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this._http.get<Project[]>("/tms/api/v1/project");
  }

  addProject(project: Project): Observable<string> {
    return this._http.post("/tms/api/v1/project", project, {
      responseType: 'text'
    });
  }
}
