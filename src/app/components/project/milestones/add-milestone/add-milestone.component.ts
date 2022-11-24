import { Component } from '@angular/core';
import { Milestone } from 'src/app/models/milestone';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.scss']
})
export class AddMilestoneComponent {
  projectId = 1;
  milestone: Milestone = {
    projectId: this.projectId,
    milestoneName: '',
    completed: false
  }
}
