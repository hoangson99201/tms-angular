import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/models/section';
import { TestCase } from 'src/app/models/test-case';
import { SectionService } from 'src/app/services/section.service';
import { TestCaseService } from 'src/app/services/test-case.service';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { SectionDialogComponent } from './section-dialog/section-dialog.component';

@Component({
  selector: 'app-testcase',
  templateUrl: './testcase.component.html',
  styleUrls: ['./testcase.component.scss'],
})
export class TestcaseComponent {
  constructor(
    private route: ActivatedRoute,
    private testCaseService: TestCaseService,
    public dialog: MatDialog,
    private sectionService: SectionService,
    private authService: AuthService
  ) { }
  public projectId: string = '';
  public testCases: TestCase[] = [];
  public map: Map<string, TestCase[]> = new Map<string, TestCase[]>();
  public sections: Section[] = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      this.refreshTestCase(parseInt(this.projectId));
      this.sectionService.findAllByProjectId(parseInt(this.projectId))
        .subscribe(sections => {
          this.sections = sections;
          console.log(sections);
        });
    });
  }

  refreshTestCase(projectId: number) {
    this.testCaseService
      .findAllByProjectId(projectId)
      .subscribe((testCases) => {
        this.testCases = testCases;
        this.map = new Map<string, TestCase[]>();
        for (const testCase of testCases) {
          if (!testCase.sectionName) continue;
          let testCases = this.map.get(testCase.sectionName);
          if (!testCases) {
            this.map.set(testCase.sectionName, [testCase]);
          } else {
            testCases.push(testCase);
          }
        }
        console.log(testCases);
        console.log(this.map);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SectionDialogComponent, {
      data: {
        type: 'add',
        projectId: parseInt(this.projectId)
      },
    });
  }

  deleteTestCase(testCaseId: number | undefined) {
    if (testCaseId != undefined) {
      const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        data: {
          testCaseId
        },
      }).afterClosed()
        .subscribe((_) => {
          this.refreshTestCase(parseInt(this.projectId));
        });
    }
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
