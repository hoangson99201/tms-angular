import { Result } from 'src/app/models/result';
import { DatePipe } from '@angular/common';
import { TestRun } from 'src/app/models/test-run';
import { ReportService } from './../../../../services/report.service';
import { Report } from './../../../../models/report';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  colors: any[]
};

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.scss']
})
export class DetailReportComponent {
  constructor(private route: ActivatedRoute, private reportService: ReportService, private datePipe: DatePipe) { }
  public chartOptions: ChartOptions | undefined;
  public numUntested = 0;
  public percentPassed = '0';
  public percentUntested = '0';
  public totalResults = 0;
  public report: Report = {};
  public testRunsMap: Map<string, TestRun[]> = new Map<
    string,
    TestRun[]
  >();
  public sectionResultsMap: Map<string, Map<string, Result[]>> = new Map<string, Map<string, Result[]>>();
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.reportService.findByReportId(parseInt(params['id'])).subscribe(report => {
        this.report = report;
        this.report.createdOn = this.convertDate(this.report.createdOn);
        if (typeof this.report.jsonData === 'string') {
          this.report.jsonData = JSON.parse(this.report.jsonData);
        }
        if (typeof this.report.jsonData !== 'string' && this.report.jsonData) {
          this.extractTestRuns(this.report.jsonData.testRuns);
          this.createChart(this.report.jsonData.testRuns);
        }
        console.log(this.report);

      });
    });
  }

  createChart(testRuns: TestRun[]) {
    let results = testRuns.flatMap(run => run.results);
    this.chartOptions = {
      series: [0, 0, 0, 0, 0],
      chart: {
        width: 390,
        type: "pie",
        height: 260
      },
      labels: ["Passed", "Blocked", "Retest", "Failed", "Untested"],
      colors: ['#338a41', '#474747', '#b99109', '#a9093a', '#737373'],
    }
    this.numUntested = 0;
    for (const result of results) {
      if (result === undefined) continue;
      switch (result.status) {
        case "Passed":
          this.chartOptions.series[0]++;
          break;
        case "Blocked":
          this.chartOptions.series[1]++;
          break;
        case "Retest":
          this.chartOptions.series[2]++;
          break;
        case "Failed":
          this.chartOptions.series[3]++;
          break;
        case "Untested":
          this.chartOptions.series[4]++;
          this.numUntested++;
          break;
        default:
          break;
      }
    }
    this.percentUntested = (this.numUntested / results.length * 100).toFixed(1);
    this.percentPassed = (this.chartOptions.series[0] / results.length * 100).toFixed(1);
    this.totalResults = results.length;
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
        let array = this.testRunsMap.get(testRun.createdOn);
        if (!array) {
          this.testRunsMap.set(testRun.createdOn, [testRun]);
        } else {
          array.push(testRun);
        }
      }

      if (!testRun.results) {
        continue;
      }
      let map = new Map<string, Result[]>();
      for (const result of testRun.results) {
        if (!result.sectionName) continue;
        let tempResults = map.get(result.sectionName);
        if (!tempResults) {
          map.set(result.sectionName, [result]);
        } else {
          tempResults.push(result);
        }
      }
      this.sectionResultsMap.set(testRun.runName, map);
    }
  }

  convertDate(createdOn: string | number | undefined): string {
    if (createdOn === undefined) {
      return '';
    }
    if (!isNaN(Number(createdOn))) {
      createdOn = Number(createdOn) * 1000;
    }
    let date = this.datePipe.transform(createdOn, 'd/M/yyyy, h:mm a');
    if (date == null) {
      return '';
    }
    return date;
  }
}
