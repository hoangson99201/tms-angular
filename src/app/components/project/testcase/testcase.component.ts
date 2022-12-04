import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestCase } from 'src/app/models/test-case';
import { TestCaseService } from 'src/app/services/test-case.service';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog
  ) {}
  public projectId: string = '';
  public testCases: TestCase[] = [];
  public map: Map<string, TestCase[]> = new Map<string, TestCase[]>();
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      this.testCaseService
        .findAllByProjectId(+this.projectId)
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
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SectionDialogComponent, {
      data: {
        type: 'add',
      },
    });
  }
}
