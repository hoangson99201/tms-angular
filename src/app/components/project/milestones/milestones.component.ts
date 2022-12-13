import { DatePipe } from '@angular/common';
import { MilestoneService } from 'src/app/services/milestone.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Milestone } from 'src/app/models/milestone';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss'],
  providers: [DatePipe]
})
export class MilestonesComponent {
  constructor(private route: ActivatedRoute, private milestoneService: MilestoneService, private datePipe: DatePipe) { }

  public projectId: string = '';
  public incompleteMilestones: Milestone[] = [];
  public completedMilestones: Map<string, Milestone[]> = new Map<string, Milestone[]>();
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      this.milestoneService.findAllByProjectId(parseInt(this.projectId)).subscribe(milestones => {
        for (const milestone of milestones) {
          if (milestone.completed) {
            if (!milestone.completedOn) {
              continue;
            }
            if (milestone.completedOn instanceof Array) {
              let date = this.datePipe.transform(milestone.completedOn[0] + "/" + milestone.completedOn[1] + "/" + milestone.completedOn[2], 'EEEE, MMMM d, y');
              if (!date) {
                continue;
              }
              milestone.completedOn = date
              let array = this.completedMilestones.get(milestone.completedOn);
              if (!array) {
                this.completedMilestones.set(milestone.completedOn, [milestone]);
              } else {
                array.push(milestone);
              }
            }
          } else {
            if (milestone.endDate instanceof Array) {
              milestone.endDate = milestone.endDate[2] + "/" + milestone.endDate[1] + "/" + milestone.endDate[0];
            }
            this.incompleteMilestones.push(milestone);
          }
        }
      });
    });
  }
}
