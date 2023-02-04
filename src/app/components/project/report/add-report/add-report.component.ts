import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/models/report';
import { TestRun } from 'src/app/models/test-run';
import { AuthService } from 'src/app/services/auth.service';
import { ReportService } from 'src/app/services/report.service';
import { SelectTestRunDialogComponent } from './select-test-run-dialog/select-test-run-dialog.component';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss'],
})
export class AddReportComponent {
  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private _location: Location,
    private authService: AuthService
  ) {}
  public projectId: string = '';
  public fullName: string = '';
  public des: string = '';
  public testRunsSelected: TestRun[] = [];
  public oldSelectedTestRun = new Set<TestRun>();

  public report: Report = {
    projectId: parseInt(this.projectId),
    reportName: '',
    reportDescription: '',
    jsonData: JSON.stringify({
      results: [],
      testRuns: this.testRunsSelected,
    }),
  };
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      this.report.projectId = parseInt(this.projectId);
    });
  }
  submit() {
    if (
      !(
        this.report.testRunIds &&
        this.report.reportName &&
        this.report.reportName.trim()
      )
    ) {
      this.toastr.warning('Name and Test Run must not empty', 'Warning');
      return;
    }
    this.reportService.addReport(this.report).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add report success', 'Success');
        this.router.navigateByUrl('/reports/' + this.projectId);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Add report failed', 'Error');
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog
      .open(SelectTestRunDialogComponent, {
        data: {
          project_id: this.projectId,
          test_run_ids: this.report.testRunIds,
          old_test_runs: this.oldSelectedTestRun,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result && result.data) {
          this.oldSelectedTestRun = result.data;
          this.testRunsSelected = [...result.data];
        }
        console.log(this.testRunsSelected);
        this.report.jsonData = JSON.stringify({
          results: [],
          testRuns: this.testRunsSelected,
        });
        this.report.testRunIds = this.testRunsSelected.map((a) => {
          return a.runId;
        });
        console.log(this.report.testRunIds);
      });
  }

  backClicked() {
    this._location.back();
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
