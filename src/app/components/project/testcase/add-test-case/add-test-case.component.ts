import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Priority } from 'src/app/models/priority';
import { Section } from 'src/app/models/section';
import { TestCase } from 'src/app/models/test-case';
import { PriorityService } from 'src/app/services/priority.service';
import { SectionService } from 'src/app/services/section.service';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-add-test-case',
  templateUrl: './add-test-case.component.html',
  styleUrls: ['./add-test-case.component.scss']
})
export class AddTestCaseComponent implements OnInit {
  projectId: number = 1;
  testCase: TestCase = {
    caseName: '',
    projectId: this.projectId,
    userId: 2
  }
  sections: Section[] = [];
  priorities: Priority[] = [];

  constructor(private sectionService: SectionService, private priorityService: PriorityService,
    private _location: Location, private testCaseService: TestCaseService, private router: Router) { }

  ngOnInit(): void {
    this.sectionService.findAllByProjectId(this.projectId).subscribe(sections => {
      this.sections = sections;
    });
    this.priorityService.findAll().subscribe(priorities => {
      this.priorities = priorities;
    })
  }

  backClicked() {
    this._location.back();
  }

  submit() {
    this.testCaseService.addTestCase(this.testCase).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('');
    });
  }
}
