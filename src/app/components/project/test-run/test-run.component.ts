import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TestRun } from 'src/app/models/test-run';
import { AuthService } from 'src/app/services/auth.service';
import { TestRunService } from 'src/app/services/test-run.service';
import { BasePaginator } from './../../../core/base-paginator';
import { RerunDialogComponent } from '../test-run/rerun-dialog/rerun-dialog.component';

@Component({
  selector: 'app-test-run',
  templateUrl: './test-run.component.html',
  styleUrls: ['./test-run.component.scss'],
  providers: [DatePipe],
})
export class TestRunComponent extends BasePaginator {
  refresh(): void {
    throw new Error('Method not implemented.');
  }
  constructor(
    private route: ActivatedRoute,
    private testRunService: TestRunService,
    private datePipe: DatePipe,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    super();
  }

  public projectId: string = '';
  public incompleteTestRuns: TestRun[] = [];
  public completedTestRuns: Map<string, TestRun[]> = new Map<
    string,
    TestRun[]
  >();
  public numCompletedTestRuns = 0;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      this.testRunService
        .findAllByProjectId(parseInt(this.projectId))
        .subscribe((testRuns) => {
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

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }

  openDialog(runId: any) {
    const dialogRef = this.dialog
      .open(RerunDialogComponent, {
        data: {
          projectId: this.projectId,
          testrunId: runId,
        },
      })
      .afterClosed()
      .subscribe((_) => {});
  }
}
