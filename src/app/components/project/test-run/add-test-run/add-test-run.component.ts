import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mode } from 'src/app/core/mode';
import { Milestone } from 'src/app/models/milestone';
import { Result } from 'src/app/models/result';
import { TestCase } from 'src/app/models/test-case';
import { TestRun } from 'src/app/models/test-run';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MilestoneService } from 'src/app/services/milestone.service';
import { ResultService } from 'src/app/services/result.service';
import { TestCaseService } from 'src/app/services/test-case.service';
import { TestRunService } from 'src/app/services/test-run.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmCloseDialogComponent } from '../confirm-close-dialog/confirm-close-dialog.component';
import { SelectCaseDialogComponent } from './select-case-dialog/select-case-dialog.component';

@Component({
  selector: 'app-add-test-run',
  templateUrl: './add-test-run.component.html',
  styleUrls: ['./add-test-run.component.scss'],
})
export class AddTestRunComponent implements OnInit {
  constructor(
    private testRunService: TestRunService,
    private router: Router,
    private milestoneService: MilestoneService,
    private toastr: ToastrService,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private resultService: ResultService,
    private testCaseService: TestCaseService,
    private authService: AuthService
  ) {}

  testRun: TestRun = {
    runName: 'Test Run ' + this.getToday(),
    projectId: 0,
    includeAll: true,
  };
  milestones: Milestone[] = [];
  users: User[] = [];
  testCasesIdIncluded: (number | undefined)[] = [];
  currentMode: Mode = Mode.Create;
  Mode = Mode;
  rerunId: string = '';
  projectId: string = '';

  public map: Map<string, TestCase[]> = new Map<string, TestCase[]>();
  public testCases: TestCase[] = [];
  public oldSelectedTestCase: (number | undefined)[] = [];

  ngOnInit(): void {
    this.currentMode = this.router.url.startsWith('/test-runs-edit/')
      ? Mode.Update
      : Mode.Create;
    // console.log('Current mode: ' + this.currentMode);

    this.route.params.subscribe((params) => {
      // console.log(params);
      switch (this.currentMode) {
        case Mode.Create:
          this.testRun.projectId = params['id'];
          this.projectId = params['id'];
          this.rerunId = params['rerun-id'];
          this.getMilestonesByProjectId(this.testRun.projectId);
          break;
        case Mode.Update:
          this.testRunService
            .findByTestRunId(params['id'])
            .subscribe((testRun) => {
              this.testRun = testRun;
              this.loadCase(this.testRun, this.testRun.projectId);
              this.getMilestonesByProjectId(this.testRun.projectId);
            });
          break;
        default:
          break;
      }

      this.userService.getUsers().subscribe((users) => {
        this.users = users;
        // console.log(users);
      });
    });
    this.rerun();
  }

  rerun() {
    if (this.rerunId) {
      this.resultService
        .findAllByTestRunId(parseInt(this.rerunId))
        .subscribe((results) => {
          var statusData = this.testRunService.getData();
          if (statusData) {
            // console.log(statusData);
            if (statusData && statusData.length < 4) {
              this.testRun.includeAll = false;
            }
            var resultFilter = results
              .filter((a) => statusData.includes(a.status))
              .map((b) => b.caseId);
            // console.log(resultFilter);

            this.testCaseService
              .findAllByProjectId(+this.projectId)
              .subscribe((testCases) => {
                this.testCases = testCases;
                let casetFilter = testCases.filter((a) =>
                  resultFilter.includes(a.caseId)
                );
                this.testCasesIdIncluded = casetFilter.map((a) => a.caseId);
                this.oldSelectedTestCase = casetFilter.map((a) => a.caseId);
                // console.log(casetFilter);
              });
          }
        });
    }
  }

  loadCase(testRun: TestRun, projectId: any) {
    this.testCaseService
      .findAllByProjectId(projectId)
      .subscribe((testCases) => {
        this.testCases = testCases;
        if (testRun && testRun.results) {
          console.log(new Set(this.testCases.map((a) => a.caseId)));
          console.log(new Set(testRun.results.map((a) => a.caseId)));

          let selectedCase = [...new Set(testRun.results.map((a) => a.caseId))];
          this.testCasesIdIncluded = selectedCase;
          this.oldSelectedTestCase = selectedCase;
          let allCase = [...new Set(this.testCases.map((a) => a.caseId))];
          if (
            selectedCase.every((x) => allCase.includes(x)) &&
            selectedCase.length === allCase.length
          ) {
            testRun.includeAll = true;
          } else {
            testRun.includeAll = false;
          }
        }
      });
  }

  getMilestonesByProjectId(projectId: number | undefined) {
    if (!projectId) {
      // console.error('projectId is undefined');
      return;
    }
    this.milestoneService
      .findAllByProjectId(projectId)
      .subscribe((milestones) => {
        this.milestones = milestones;
        // console.log(milestones);
      });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    if (this.testCasesIdIncluded.length) {
      this.testCasesIdIncluded = this.testCasesIdIncluded.map((a) =>
        parseInt(a + '')
      );
      console.log(this.testCasesIdIncluded);
      let results: Result[] = this.testCasesIdIncluded.map((caseId) => ({
        caseId: caseId,
      }));
      this.testRun.testRunResults = results;
      console.log("acccccccccccc");
      console.log(results);
      console.log("aaaaaaaaaaaaaaa");
      console.log(this.testRun);

    }
    this.testRunService.create(this.testRun).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.success('Add test run success', 'Success');
        this.router.navigateByUrl('/test-runs/' + this.testRun.projectId);
      },
      error: (e) => {
        // console.log(e);
        this.toastr.error('Add test run failed', 'Error');
      },
    });
  }

  getToday(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    let result: string;
    if (dd < 10) {
      result = '0' + dd;
    } else {
      result = '' + dd;
    }
    result += '/';
    if (mm < 10) {
      result += '0' + mm;
    } else {
      result += '' + mm;
    }
    return result + '/' + yyyy;
  }

  openDialog() {
    const dialogRef = this.dialog
      .open<
        SelectCaseDialogComponent,
        any,
        {
          event: string;
          data?: number[];
        }
      >(SelectCaseDialogComponent, {
        data: {
          id: this.testRun.projectId,
          test_cases_ids: this.testCasesIdIncluded,
          old_test_cases: this.oldSelectedTestCase,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result && result.event != 'Cancel' && result.data) {
          this.oldSelectedTestCase = [...result.data];
          this.testCasesIdIncluded = [...result.data];
        }
        // console.log(this.testCasesIdIncluded);
      });
  }

  close() {
    this.dialog
      .open(ConfirmCloseDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result && result.event == 'Close') {
          this.testRun.isCompleted = true;
          this.update();
        }
      });
  }

  update() {
    if (this.testCasesIdIncluded.length) {
      this.testCasesIdIncluded = this.testCasesIdIncluded.map((a) =>
        parseInt(a + '')
      );
      console.log(this.testCasesIdIncluded);
      let results: Result[] = this.testCasesIdIncluded.map((caseId) => ({
        caseId: caseId,
      }));
      this.testRun.results = results;
      console.log("acccccccccccc");
      console.log(results);
      console.log("aaaaaaaaaaaaaaa");
      console.log(this.testRun);

    }
    this.testRunService.update(this.testRun).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.success('Update test run success', 'Success');
        this.router.navigateByUrl('/test-runs/' + this.testRun.projectId);
      },
      error: (e) => {
        // console.log(e);
        this.toastr.error('Update test run failed', 'Error');
      },
    });
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
