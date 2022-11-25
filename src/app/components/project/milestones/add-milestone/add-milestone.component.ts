import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { ToastrService } from 'ngx-toastr';
import { Milestone } from 'src/app/models/milestone';
import { MilestoneService } from 'src/app/services/milestone.service';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss'],
})
export class AddMilestoneComponent {
  constructor(
    private milestoneService: MilestoneService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}

  projectId = 1;
  milestone: Milestone = {
    projectId: this.projectId,
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
        this.router.navigateByUrl('');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Add milestone failed', 'Error');
      },
    });
  }
}
