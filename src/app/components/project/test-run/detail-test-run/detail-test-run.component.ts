import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Result } from 'src/app/models/result';
import { TestRun } from 'src/app/models/test-run';
import { AuthService } from 'src/app/services/auth.service';
import { ResultService } from 'src/app/services/result.service';
import { TestRunService } from 'src/app/services/test-run.service';
import { AddResultComponent } from '../add-result/add-result.component';
import { ConfirmCloseDialogComponent } from '../confirm-close-dialog/confirm-close-dialog.component';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  colors: any[]
};

@Component({
  selector: 'app-detail-test-run',
  templateUrl: './detail-test-run.component.html',
  styleUrls: ['./detail-test-run.component.scss'],
})
export class DetailTestRunComponent implements OnInit {
  public chartOptions: ChartOptions | undefined;
  public numUntested = 0;
  public percentPassed = '0';
  public percentUntested = '0';
  public projectId: string = '';
  public testRunId: string = '';
  public testRunName: string = '';
  public createDate: string = '';
  public isCompleted: boolean = false;
  public results: Result[] = [];
  public map: Map<string, Result[]> = new Map<string, Result[]>();
  public top: string = '';
  public left: string = '';
  testRun: TestRun = {
    runId: this.testRunId,
    runName: '',
  };
  @ViewChild('statusDropdown') statusDropdown: any;
  @ViewChild('button') button: any;
  public isMenuOpen = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private testRunService: TestRunService,
    private resultService: ResultService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      this.testRunId = params['subId'];
      console.log(this.projectId);
      console.log(this.testRunId);
      this.refreshResult(parseInt(this.testRunId));
      this.testRunService
        .findByTestRunId(parseInt(this.testRunId))
        .subscribe((results) => {
          this.testRun = results;
          this.testRunName = results.runName;
          this.isCompleted = results.isCompleted ? results.isCompleted : false;
          this.createDate = results.createdOn
            ? results.createdOn[2] +
            '/' +
            results.createdOn[1] +
            '/' +
            results.createdOn[0]
            : '';
        });
    });
    // document.addEventListener('click', (e) => {
    //   if (e.target instanceof Element) {
    //     if (!e.target.className.startsWith('custom-dropdown')) {
    //       this.top = '';
    //       this.left = '';
    //     }
    //   }
    // });
  }

  refreshResult(testRunId: number) {
    this.resultService.findAllByTestRunId(testRunId).subscribe((results) => {
      this.results = results;
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
      this.percentUntested = (this.numUntested / this.results.length * 100).toFixed(1);
      this.percentPassed = (this.chartOptions.series[0] / this.results.length * 100).toFixed(1);

      this.map = new Map<string, Result[]>();
      for (const result of results) {
        if (!result.sectionName) continue;
        let results = this.map.get(result.sectionName);
        if (!results) {
          this.map.set(result.sectionName, [result]);
        } else {
          results.push(result);
        }
      }
    });
  }

  openDialog(status: any, id: any, isCompleted: boolean) {
    console.log('here');
    const dialogRef = this.dialog
      .open(AddResultComponent, {
        data: {
          status: status,
          id: id,
          isCompleted: isCompleted,
        },
      })
      .afterClosed()
      .subscribe((_) => {
        this.refreshResult(parseInt(this.testRunId));
      });
  }

  openDropDown(e: any) {
    var target = e.target || e.srcElement || e.currentTarget;
    console.log(target.getBoundingClientRect());
    this.left = target.getBoundingClientRect()['x'] + 'px';
    this.top = target.getBoundingClientRect()['y'] + 24 + 'px';
    console.log(this.isMenuOpen);
    console.log(this.top);
    console.log(this.left);
  }

  update() {
    this.testRunService.update(this.testRun).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Update test run success', 'Success');
        this.router.navigateByUrl('/test-runs/' + this.testRun.projectId);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Update test run failed', 'Error');
      },
    });
  }

  close() {
    this.dialog
      .open(ConfirmCloseDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result && result.event == 'Close') {
          this.testRun.isCompleted = true;
          // this.testRun.runId = this.testRunId;
          // this.testRun.projectId = parseInt(this.projectId);
          this.update();
        }
      });
  }
}
