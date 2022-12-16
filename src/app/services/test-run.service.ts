import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestRun } from '../models/test-run';

@Injectable({
  providedIn: 'root'
})
export class TestRunService {

  constructor(private _http: HttpClient) { }

  create(testRun: TestRun): Observable<string> {
    return this._http.post("/tms/api/v1/test-run", testRun, {
      responseType: 'text'
    });
  }

  findAllByProjectId(projectId: number): Observable<TestRun[]> {
    return this._http.get<TestRun[]>("/tms/api/v1/project/" + projectId + "/test-run");
  }

  findByTestRunId(testRunId: number): Observable<TestRun> {
    return this._http.get<TestRun>("/tms/api/v1/test-run/" + testRunId);
  }

  update(testRun: TestRun): Observable<string> {
    return this._http.put("/tms/api/v1/test-run", testRun, {
      responseType: 'text'
    });
  }

  findAllByMilestoneId(projectId: number): Observable<TestRun[]> {
    return this._http.get<TestRun[]>("/tms/api/v1/milestone/" + projectId + "/test-run");
  }
}
