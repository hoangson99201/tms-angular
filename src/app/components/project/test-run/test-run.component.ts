import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestRun } from 'src/app/models/test-run';
import { TestRunService } from 'src/app/services/test-run.service';

@Component({
  selector: 'app-test-run',
  templateUrl: './test-run.component.html',
  styleUrls: ['./test-run.component.scss']
})
export class TestRunComponent {
  constructor(private route: ActivatedRoute, private testRunService: TestRunService) { }

  public projectId: string = '';
  public incompleteTestRuns: TestRun[] = [];
  public completedTestRuns: TestRun[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      this.testRunService.findAllByProjectId(parseInt(this.projectId)).subscribe(testRuns => {
        for (const testRun of testRuns) {
          if (testRun.isCompleted) {
            this.completedTestRuns.push(testRun);
          } else {
            if (testRun.createdOn instanceof Array) {
              testRun.createdOn = testRun.createdOn[2] + "/" + testRun.createdOn[1] + "/" + testRun.createdOn[0];
            }
            this.incompleteTestRuns.push(testRun);
          }
        }
      });
    });
  }
}
