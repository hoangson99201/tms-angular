import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mode } from 'src/app/core/mode';
import { Priority } from 'src/app/models/priority';
import { Section } from 'src/app/models/section';
import { TestCase } from 'src/app/models/test-case';
import { PriorityService } from 'src/app/services/priority.service';
import { SectionService } from 'src/app/services/section.service';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-add-test-case',
  templateUrl: './add-test-case.component.html',
  styleUrls: ['./add-test-case.component.scss'],
})
export class AddTestCaseComponent implements OnInit {
  testCase: TestCase = {
    caseName: '',
    projectId: 0,
    userId: 2,
  };
  sections: Section[] = [];
  priorities: Priority[] = [];
  mode: Mode = Mode.Create;

  constructor(
    private sectionService: SectionService,
    private priorityService: PriorityService,
    private _location: Location,
    private testCaseService: TestCaseService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mode = this.router.url.startsWith('/test-cases-edit/') ? Mode.Update : Mode.Create;
    console.log('Current mode: ' + this.mode);

    this.route.params.subscribe((params) => {
      console.log(params);
      switch (this.mode) {
        case Mode.Create:
          this.testCase.projectId = params['id'];
          break;
        case Mode.Update:

          break;
        default:
          break;
      }
      console.log('Test case data: ' + this.testCase);
      this.sectionService
        .findAllByProjectId(this.testCase.projectId)
        .subscribe((sections) => {
          this.sections = sections;
        });
      this.priorityService.findAll().subscribe((priorities) => {
        this.priorities = priorities;
      });
    });
  }

  backClicked() {
    this._location.back();
  }

  submit() {
    this.testCaseService.addTestCase(this.testCase).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add testcase success', 'Success');
        this.router.navigateByUrl('/test-cases/' + this.testCase.projectId);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Add testcase failed', 'Error');
      },
    });
  }
}
