import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mode } from 'src/app/core/mode';
import { Milestone } from 'src/app/models/milestone';
import { TestRun } from 'src/app/models/test-run';
import { User } from 'src/app/models/user';
import { MilestoneService } from 'src/app/services/milestone.service';
import { TestRunService } from 'src/app/services/test-run.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog
  ) { }

  userId = 2;
  testRun: TestRun = {
    runName: 'Test Run ' + this.getToday(),
    projectId: 0,
    userId: this.userId,
    includeAll: true,
  };
  milestones: Milestone[] = [];
  users: User[] = [];
  testCasesIdIncluded: string[] = [];
  currentMode: Mode = Mode.Create;
  Mode = Mode;

  ngOnInit(): void {
    this.currentMode = this.router.url.startsWith('/test-runs-edit/') ? Mode.Update : Mode.Create;
    console.log('Current mode: ' + this.currentMode);

    this.route.params.subscribe((params) => {
      console.log(params);
      switch (this.currentMode) {
        case Mode.Create:
          this.testRun.projectId = params['id'];
          this.getMilestonesByProjectId(this.testRun.projectId);
          break;
        case Mode.Update:
          this.testRunService.findByTestRunId(params['id'])
            .subscribe(testRun => {
              this.testRun = testRun;
              this.getMilestonesByProjectId(this.testRun.projectId);
            })
          break;
        default:
          break;
      }

      this.userService.getUsers().subscribe((users) => {
        this.users = users;
        console.log(users);
      });
    });
  }

  getMilestonesByProjectId(projectId: number | undefined) {
    if (!projectId) {
      console.error('projectId is undefined');
      return;
    }
    this.milestoneService.findAllByProjectId(projectId).subscribe((milestones) => {
      this.milestones = milestones;
      console.log(milestones);
    });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    this.testRunService.create(this.testRun).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add test run success', 'Success');
        this.router.navigateByUrl('/test-runs/' + this.testRun.projectId);
      },
      error: (e) => {
        console.log(e);
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
    const dialogRef = this.dialog.open(SelectCaseDialogComponent, {
      data: {
        id: this.testRun.projectId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result && result.event != 'Cancel') {
        this.testCasesIdIncluded = [...result.data]
      }
      console.log(this.testCasesIdIncluded);
    });
  }

  close() {
    this.testRun.isCompleted = true;
    this.update();
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
}
