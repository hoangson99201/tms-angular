import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestRun } from '../models/test-run';

@Injectable({
  providedIn: 'root'
})
export class TestRunService {

  constructor(private _http: HttpClient) { }

  addTestRun(testRun: TestRun): Observable<string> {
    return this._http.post("/tms/api/v1/test-run", testRun, {
      responseType: 'text'
    });
  }
}
