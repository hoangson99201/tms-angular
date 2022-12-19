import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith } from 'rxjs';
import { Milestone } from 'src/app/models/milestone';
import { Project } from 'src/app/models/project';
import { TestCase } from 'src/app/models/test-case';
import { TestRun } from 'src/app/models/test-run';
import { MilestoneService } from 'src/app/services/milestone.service';
import { TestCaseService } from 'src/app/services/test-case.service';
import { TestRunService } from 'src/app/services/test-run.service';

@Component({
  selector: 'app-search-detail-project',
  templateUrl: './search-detail-project.component.html',
  styleUrls: ['./search-detail-project.component.scss']
})
export class SearchDetailProjectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private testCaseService: TestCaseService, private milestoneService: MilestoneService, private testRunService: TestRunService) { }

  testCases: TestCase[] = [];
  milestones: Milestone[] = [];
  testRuns: TestRun[] = [];
  public project: Project = {
    projectName: ''
  };
  searchParam: string = '';

  ngOnInit(): void {
    const observableParams = this.route.params;
    const observableQueryParams = this.route.queryParams;
    observableParams.pipe(
      combineLatestWith(observableQueryParams)
    ).subscribe(([params, queryParams]) => {
      console.log(params);
      this.project.projectId = params['id'];
      console.log(this.project.projectId);
      if (!this.project.projectId) {
        return;
      }
      this.searchParam = queryParams['searchParam'];
      if (this.searchParam == undefined) {
        this.searchParam = '';
      }
      this.searchParam = this.searchParam.trim();
      this.testCaseService.findAllByProjectId(this.project.projectId).subscribe(testCases => {
        this.testCases = testCases.filter(testCase => testCase.caseName.includes(this.searchParam));
      });
      this.milestoneService.findAllByProjectId(this.project.projectId).subscribe(milestones => {
        this.milestones = milestones.filter(milestone => milestone.milestoneName.includes(this.searchParam));
      });
      this.testRunService.findAllByProjectId(this.project.projectId).subscribe(testRuns => {
        this.testRuns = testRuns.filter(testRun => testRun.runName.includes(this.searchParam));
      });
    })
  }
}
