import { DatePipe } from '@angular/common';
import { TestRun } from 'src/app/models/test-run';
import { ReportService } from './../../../../services/report.service';
import { Report } from './../../../../models/report';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.scss']
})
export class DetailReportComponent {
  constructor(private route: ActivatedRoute, private reportService: ReportService, private datePipe: DatePipe) { }
  public report: Report = {};
  public testRuns: Map<string, TestRun[]> = new Map<
    string,
    TestRun[]
  >();
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.reportService.findByReportId(parseInt(params['id'])).subscribe(report => {
        this.report = report;
        if (typeof this.report.jsonData === 'string') {
          this.report.jsonData = JSON.parse(this.report.jsonData);
        }
        if (typeof this.report.jsonData !== 'string' && this.report.jsonData) {
          this.extractTestRuns(this.report.jsonData.testRuns);
        }
          console.log(this.report);

      });
    });
  }

  extractTestRuns(testRuns: TestRun[]) {
    for (const testRun of testRuns) {
      if (testRun.createdOn instanceof Array) {
        let date = this.datePipe.transform(
          testRun.createdOn[0] +
          '/' +
          testRun.createdOn[1] +
          '/' +
          testRun.createdOn[2],
          'EEEE, MMMM d, y'
        );
        if (!date) {
          continue;
        }
        testRun.createdOn = date;
        let array = this.testRuns.get(testRun.createdOn);
        if (!array) {
          this.testRuns.set(testRun.createdOn, [testRun]);
        } else {
          array.push(testRun);
        }
      }
    }
  }
}
