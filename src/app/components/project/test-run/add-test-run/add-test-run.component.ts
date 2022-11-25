import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestRun } from 'src/app/models/test-run';
import { TestRunService } from 'src/app/services/test-run.service';

@Component({
  selector: 'app-add-test-run',
  templateUrl: './add-test-run.component.html',
  styleUrls: ['./add-test-run.component.scss']
})
export class AddTestRunComponent {

  constructor(private testRunService: TestRunService, private router: Router) { }

  projectId = 1;
  userId = 2;
  testRun: TestRun = {
    runName: 'Test Run 11/25/2022',
    projectId: this.projectId,
    userId: this.userId
  }

  submit() {
    this.testRunService.addTestRun(this.testRun).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('');
    });
    console.log(this.testRun);
  }
}
