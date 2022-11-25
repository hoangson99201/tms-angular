import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Milestone } from 'src/app/models/milestone';
import { TestRun } from 'src/app/models/test-run';
import { User } from 'src/app/models/user';
import { MilestoneService } from 'src/app/services/milestone.service';
import { TestRunService } from 'src/app/services/test-run.service';
import { UserService } from 'src/app/services/user.service';

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
    private route: ActivatedRoute
  ) {}

  projectId = 1;
  userId = 2;
  testRun: TestRun = {
    runName: 'Test Run ' + this.getToday(),
    projectId: this.projectId,
    userId: this.userId,
  };
  milestones: Milestone[] = [];
  users: User[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);

      this.milestoneService
        .findAllByProjectId(this.projectId)
        .subscribe((milestones) => {
          this.milestones = milestones;
          console.log(milestones);
        });
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
        console.log(users);
      });
    });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    this.testRunService.addTestRun(this.testRun).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add test run success', 'Success');
        this.router.navigateByUrl('');
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
}
