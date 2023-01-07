import { AuthService } from './../../../../services/auth.service';
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

  constructor(
    private sectionService: SectionService,
    private priorityService: PriorityService,
    private _location: Location,
    private testCaseService: TestCaseService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  testCase: TestCase = {
    caseName: '',
    projectId: 0,
    sectionId: undefined,
    priorityId: undefined
  };
  sections: Section[] = [];
  priorities: Priority[] = [];
  currentMode: Mode = Mode.Create;
  Mode = Mode;

  ngOnInit(): void {
    this.currentMode = this.router.url.startsWith('/test-cases-edit/') ? Mode.Update : Mode.Create;
    console.log('Current mode: ' + this.currentMode);

    this.route.params.subscribe((params) => {
      console.log(params);
      switch (this.currentMode) {
        case Mode.Create:
          this.testCase.projectId = params['id'];
          this.getSectionsByProjectId(this.testCase.projectId);
          break;
        case Mode.Update:
          this.testCaseService.findByTestCaseId(params['id'])
            .subscribe(testCase => {
              this.testCase = testCase;
              this.getSectionsByProjectId(this.testCase.projectId);
            })
          break;
        default:
          break;
      }
      this.priorityService.findAll().subscribe((priorities) => {
        this.priorities = priorities;
      });
    });
  }

  getSectionsByProjectId(projectId: number | undefined) {
    if (!projectId) {
      console.error('projectId is undefined');
      return;
    }
    this.sectionService.findAllByProjectId(projectId).subscribe((sections) => {
      this.sections = sections;
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

  update() {
    this.testCaseService.update(this.testCase).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Update test case success', 'Success');
        this.router.navigateByUrl('/test-cases/' + this.testCase.projectId);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Update test case failed', 'Error');
      },
    });
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
