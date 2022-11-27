import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from './../models/section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private _http: HttpClient) { }

  findAllByProjectId(projectId: number): Observable<Section[]> {
    return this._http.get<Section[]>("/tms/api/v1/section/" + projectId);
  }

  create(user: Section): Observable<string> {
    return this._http.post("/tms/api/v1/section", user, {
      responseType: 'text'
    });
  }
}
