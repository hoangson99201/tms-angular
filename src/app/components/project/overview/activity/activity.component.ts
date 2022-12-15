import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  providers: [DatePipe]
})
export class ActivityComponent implements OnInit {
  projectId: number = 0;
  public map: Map<string, Activity[]> = new Map<string, Activity[]>();

  constructor(private route: ActivatedRoute, private activityService: ActivityService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];
      if (!this.projectId) {
        return;
      }
      this.activityService.findAllByProjectId(this.projectId).subscribe(activities => {
        for (const activity of activities) {
          activity.createdOn = this.convertDate(activity.createdOn);
          if (!activity.createdOn) continue;

          switch (activity.type) {
            case "Milestone":
              activity.className = 'entity-milestone';
              activity.url = `/milestones/${activity.projectId}/detail/${activity.targetId}`;
              break;
            case "Test Run":
              activity.className = 'entity-run';
              activity.url = `/test-runs/${activity.projectId}/detail/${activity.targetId}`;
              break;
            default:
              activity.className = '';
              break;
          }

          let list = this.map.get(activity.createdOn);
          if (!list) {
            this.map.set(activity.createdOn, [activity]);
          } else {
            list.push(activity);
          }
        }
      })
    });
  }

  convertDate(createdOn: string | number | undefined): string {
    if (createdOn === undefined) {
      return '';
    }
    if (!isNaN(Number(createdOn))) {
      createdOn = Number(createdOn) * 1000;
    }
    let date = this.datePipe.transform(createdOn, 'EEEE, MMMM d, y');
    if (date == null) {
      return '';
    }
    return date;
  }

}
