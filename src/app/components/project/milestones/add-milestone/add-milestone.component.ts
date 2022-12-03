import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { ToastrService } from 'ngx-toastr';
import { Milestone } from 'src/app/models/milestone';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.milestone.projectId = params['id'];
      console.log(this.milestone.projectId);
    });
  }

  milestone: Milestone = {
    projectId: 0,
    milestoneName: '',
    completed: false,
  };
  configStartDate: IDatePickerDirectiveConfig = {
    format: 'YYYY-MM-DD',
  };
  configEndDate: IDatePickerDirectiveConfig = {
    format: 'YYYY-MM-DD',
  };

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
}
