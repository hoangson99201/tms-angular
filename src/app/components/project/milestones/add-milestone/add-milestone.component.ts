import { Project } from 'src/app/models/project';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mode } from 'src/app/core/mode';
import { Milestone } from 'src/app/models/milestone';
import { AuthService } from 'src/app/services/auth.service';
import { MilestoneService } from 'src/app/services/milestone.service';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss'],
})
export class AddMilestoneComponent implements OnInit {
  constructor(
    private milestoneService: MilestoneService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  milestone: Milestone = {
    projectId: 0,
    milestoneName: '',
    isCompleted: false,
  };
  currentMode: Mode = Mode.Create;
  Mode = Mode;
  project: Project | undefined

  ngOnInit(): void {
    this.currentMode = this.router.url.startsWith('/milestones-edit/') ? Mode.Update : Mode.Create;
    console.log('Current mode: ' + this.currentMode);

    this.route.params.subscribe((params) => {
      switch (this.currentMode) {
        case Mode.Create:
          console.log(params);
          this.milestone.projectId = params['id'];
          break;
        case Mode.Update:
          this.milestoneService.findByMilestoneId(params['id'])
            .subscribe(milestone => {
              if (milestone.endDate instanceof Array) {
                milestone.endDate = milestone.endDate[0] + "-" + String(milestone.endDate[1]).padStart(2, '0') + "-" + String(milestone.endDate[2]).padStart(2, '0');
              }
              if (milestone.startDate instanceof Array) {
                milestone.startDate = milestone.startDate[0] + "-" + String(milestone.startDate[1]).padStart(2, '0') + "-" + String(milestone.startDate[2]).padStart(2, '0');
              }
              this.milestone = milestone;
            })
          break;
        default:
          break;
      }
    });
  }

  cancel() {
    this.location.back();
  }

  submit() {
    this.milestoneService.addMilestone(this.milestone).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add milestone success', 'Success');
        this.router.navigateByUrl('/milestones/' + this.milestone.projectId);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Add milestone failed', 'Error');
      },
    });
  }

  update() {
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

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }

  findMaxDate(milestoneEndDate: string) {
    let projectEndDate = this.project?.endDate;
    if (!projectEndDate) {
      return milestoneEndDate;
    }
    if (projectEndDate instanceof Array) {
      projectEndDate = projectEndDate[0] + "-" + String(projectEndDate[1]).padStart(2, '0') + "-" + String(projectEndDate[2]).padStart(2, '0');
    }
    if (!milestoneEndDate) {
      return projectEndDate;
    }
    return new Date(projectEndDate) < new Date(milestoneEndDate) ? projectEndDate : milestoneEndDate;
  }

  findMinDate(milestoneStartDate: string) {
    let projectStartDate = this.project?.startDate;
    if (!projectStartDate) {
      return milestoneStartDate;
    }
    if (projectStartDate instanceof Array) {
      projectStartDate = projectStartDate[0] + "-" + String(projectStartDate[1]).padStart(2, '0') + "-" + String(projectStartDate[2]).padStart(2, '0');
    }
    if (!milestoneStartDate) {
      return projectStartDate;
    }
    return new Date(projectStartDate) > new Date(milestoneStartDate) ? projectStartDate : milestoneStartDate;
  }

  getProjectStartDate() {
    let projectStartDate = this.project?.startDate;
    if (projectStartDate instanceof Array) {
      projectStartDate = projectStartDate[0] + "-" + String(projectStartDate[1]).padStart(2, '0') + "-" + String(projectStartDate[2]).padStart(2, '0');
    }
    return projectStartDate
  }

  getProjectEndDate() {
    let projectEndDate = this.project?.endDate;
    if (projectEndDate instanceof Array) {
      projectEndDate = projectEndDate[0] + "-" + String(projectEndDate[1]).padStart(2, '0') + "-" + String(projectEndDate[2]).padStart(2, '0');
    }
    return projectEndDate
  }
}
