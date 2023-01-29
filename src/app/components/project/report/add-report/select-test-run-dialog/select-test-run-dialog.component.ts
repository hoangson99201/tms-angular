import { Component, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TestRun } from 'src/app/models/test-run';
import { AuthService } from 'src/app/services/auth.service';
import { TestRunService } from 'src/app/services/test-run.service';
import { MilestoneService } from 'src/app/services/milestone.service';
@Component({
  selector: 'app-select-test-run-dialog',
  templateUrl: './select-test-run-dialog.component.html',
  styleUrls: ['./select-test-run-dialog.component.scss'],
})
export class SelectTestRunDialogComponent {
  constructor(
    private route: ActivatedRoute,
    private testRunService: TestRunService,
    private datePipe: DatePipe,
    private authService: AuthService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private testRunDialog: MatDialogRef<SelectTestRunDialogComponent>,
    private milestoneService: MilestoneService
  ) {}

  public projectId: string = '';
  public incompleteTestRuns: TestRun[] = [];
  public testRuns: TestRun[] = [];
  public selectedTestRun = new Set<TestRun>();
  public completedTestRuns: Map<string, TestRun[]> = new Map<
    string,
    TestRun[]
  >();
  public numCompletedTestRuns = 0;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = this.data.project_id;
      console.log(this.projectId);
      this.testRunService
        .findAllByProjectId(parseInt(this.projectId))
        .subscribe((testRuns) => {
          this.testRuns = testRuns;
          for (const testRun of testRuns) {
            if (testRun.isCompleted) {
              if (!testRun.completedOn) {
                continue;
              }
              if (testRun.completedOn instanceof Array) {
                let date = this.datePipe.transform(
                  testRun.completedOn[0] +
                    '/' +
                    testRun.completedOn[1] +
                    '/' +
                    testRun.completedOn[2],
                  'EEEE, MMMM d, y'
                );
                if (!date) {
                  continue;
                }
                testRun.completedOn = date;

                if (testRun.milestoneId) {
                  this.milestoneService
                    .findByMilestoneId(testRun.milestoneId)
                    .subscribe((milestone) => {
                      testRun.milestoneName = milestone.milestoneName;
                    });
                }
                if (this.data.test_run_ids && this.data.old_test_runs) {
                  this.data.old_test_runs.forEach((a: TestRun) => {
                    this.selectedTestRun.add(a);
                  });

                  testRun.isSelected = this.data.test_run_ids.includes(
                    testRun.runId
                  );
                }

                let array = this.completedTestRuns.get(testRun.completedOn);
                if (!array) {
                  this.completedTestRuns.set(testRun.completedOn, [testRun]);
                } else {
                  array.push(testRun);
                }
                this.numCompletedTestRuns++;
              }
            } else {
              if (testRun.createdOn instanceof Array) {
                testRun.createdOn =
                  testRun.createdOn[2] +
                  '/' +
                  testRun.createdOn[1] +
                  '/' +
                  testRun.createdOn[0];
              }
              this.incompleteTestRuns.push(testRun);
            }
          }
        });
    });
  }

  select(id: any) {
    let testRunSet = new Set();
    let testRun = this.testRuns.find((a) => {
      if (a.runId == id) {
        testRunSet.add(id);
        return a;
      } else return undefined;
    });
    this.data.test_run_ids = [...testRunSet];
    if (testRun) this.selectedTestRun.add(testRun);
    console.log(this.selectedTestRun);
  }
  selectAll() {
    this.selectedTestRun = new Set(
      this.testRuns.filter((a) => {
        return a;
      })
    );
    this.data.test_run_ids = [...this.selectedTestRun].map((a) => {
      return a.runId;
    });
    this.completedTestRuns.forEach((a) => {
      a.forEach((b) => {
        b.isSelected = true;
      });
    });
    console.log(this.completedTestRuns);
  }

  unselectAll() {
    this.selectedTestRun = new Set<TestRun>();
    this.data.test_run_ids = [];
    console.log(this.selectedTestRun);
    this.completedTestRuns.forEach((a) => {
      a.forEach((b) => {
        b.isSelected = false;
      });
    });
  }

  submit() {
    if (
      [...this.selectedTestRun].every((x) => this.data.old_test_runs.has(x)) &&
      this.selectedTestRun.size == this.data.old_test_runs.size &&
      this.data.old_test_runs.size > 0
    ) {
      this.testRunDialog.close({
        event: '',
        data: this.data.old_test_runs,
      });
    } else {
      this.testRunDialog.close({
        event: '',
        data: this.selectedTestRun,
      });
    }
  }
  close() {
    this.testRunDialog.close({
      event: '',
    });
  }
}
