import { TestRunService } from 'src/app/services/test-run.service';
import { TestRun } from 'src/app/models/test-run';
import { MilestoneService } from 'src/app/services/milestone.service';
import { Milestone } from 'src/app/models/milestone';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private route: ActivatedRoute, private milestoneService: MilestoneService, private testRunService: TestRunService, private authService: AuthService) { }
  public projectId: string = '';
  public milestones: Milestone[] = [];
  public testRuns: TestRun[] = [];
  public project: Project = {
    projectName: ''
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      if (!this.projectId) {
        return;
      }
      this.milestoneService.findAllByProjectId(parseInt(this.projectId)).subscribe(milestones => {
        this.milestones = milestones.slice(0, 3);
        for (const milestone of this.milestones) {
          if (milestone.endDate instanceof Array) {
            milestone.endDate = milestone.endDate[2] + "/" + milestone.endDate[1] + "/" + milestone.endDate[0];
          }
        }
      });
      this.testRunService.findAllByProjectId(parseInt(this.projectId)).subscribe(testRuns => {
        this.testRuns = testRuns.slice(0, 3);
        for (const testRun of this.testRuns) {
          if (testRun.createdOn instanceof Array) {
            testRun.createdOn = testRun.createdOn[2] + "/" + testRun.createdOn[1] + "/" + testRun.createdOn[0];
          }
        }
      });
    });
  }

  getProject(project: Project) {
    this.project = project;
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
