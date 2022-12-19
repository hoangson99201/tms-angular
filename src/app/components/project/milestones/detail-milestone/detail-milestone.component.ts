import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Milestone } from 'src/app/models/milestone';
import { Result } from 'src/app/models/result';
import { TestRun } from 'src/app/models/test-run';
import { MilestoneService } from 'src/app/services/milestone.service';
import { ResultService } from 'src/app/services/result.service';
import { TestRunService } from 'src/app/services/test-run.service';

@Component({
  selector: 'app-detail-milestone',
  templateUrl: './detail-milestone.component.html',
  styleUrls: ['./detail-milestone.component.scss'],
})
export class DetailMilestoneComponent implements OnInit {
  public projectId: string = '';
  public milestoneId: string = '';
  public milestoneName: string = '';
  public dueDate: string = '';
  public isCompleted: boolean = false;
  public results: TestRun[] = [];
  public top: string = '';
  public left: string = '';

  public incompleteTestRuns: TestRun[] = [];
  public completedTestRuns: TestRun[] = [];
  milestone: Milestone = {
    projectId: 0,
    milestoneName: '',
    isCompleted: false,
  };
  @ViewChild('statusDropdown') statusDropdown: any;
  @ViewChild('button') button: any;
  public isMenuOpen = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private testRunService: TestRunService,
    private milestoneService: MilestoneService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      this.milestoneId = params['subId'];
      console.log(this.projectId);
      console.log(this.milestoneId);
      this.refreshTestrun(parseInt(this.milestoneId));
      this.milestoneService
        .findByMilestoneId(parseInt(this.milestoneId))
        .subscribe((results) => {
          this.milestone = results;
          this.milestoneName = results.milestoneName;
          this.isCompleted = results.isCompleted ? results.isCompleted : false;
          this.dueDate = results.endDate
            ? results.endDate[2] +
              '/' +
              results.endDate[1] +
              '/' +
              results.endDate[0]
            : '';
        });
    });
  }

  refreshTestrun(testRunId: number) {
    this.testRunService
      .findAllByMilestoneId(testRunId)
      .subscribe((testRuns) => {
        this.results = testRuns;
        for (const testRun of testRuns) {
          if (testRun.isCompleted) {
            this.completedTestRuns.push(testRun);
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

  close() {
    this.milestone.isCompleted = true;
    this.milestoneService.update(this.milestone).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Update test case success', 'Success');
        this.router.navigateByUrl('/milestones/' + this.milestone.projectId);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Update test case failed', 'Error');
      },
    });
  }
}
