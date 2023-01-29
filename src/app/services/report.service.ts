import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _http: HttpClient) { }

  findByReportId(reportId: number): Observable<Report> {
    return this._http.get<Report>("/tms/api/v1/report/" + reportId);
  }

  findAllByProjectId(projectId: number): Observable<Report[]> {
    return this._http.get<Report[]>("/tms/api/v1/project/" + projectId + "/report");
  }

  addReport(report: Report): Observable<string> {
    return this._http.post("/tms/api/v1/report", report, {
      responseType: 'text'
    });
  }

}
