import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Milestone } from 'src/app/models/milestone';
import { MilestoneService } from 'src/app/services/milestone.service';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss']
})
export class AddMilestoneComponent {

  constructor(private milestoneService: MilestoneService, private router: Router) { }

  projectId = 1;
  milestone: Milestone = {
    projectId: this.projectId,
    milestoneName: '',
    completed: false
  }
  configStartDate: IDatePickerDirectiveConfig = {
    format: 'YYYY-MM-DD'
  };
  configEndDate: IDatePickerDirectiveConfig = {
    format: 'YYYY-MM-DD'
  };

  submit() {
    this.milestoneService.addMilestone(this.milestone).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('');
    });
    console.log(this.milestone);
  }
}
