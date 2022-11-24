import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestCase } from '../models/test-case';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private _http: HttpClient) { }

  addTestCase(testCase: TestCase): Observable<string> {
    return this._http.post("/tms/api/v1/test-case", testCase, {
      responseType: 'text'
    });
  }

  findAllByProjectId(projectId: number): Observable<TestCase[]> {
    return this._http.get<TestCase[]>("/tms/api/v1/test-case/" + projectId);
  }
}
