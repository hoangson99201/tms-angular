import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestCase } from 'src/app/models/test-case';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-select-case-dialog',
  templateUrl: './select-case-dialog.component.html',
  styleUrls: ['./select-case-dialog.component.scss'],
})
export class SelectCaseDialogComponent implements OnInit {
  constructor(
    private sectionDialog: MatDialogRef<SelectCaseDialogComponent>,
    private testCaseService: TestCaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) document: Document
  ) {}

  public selectedTestCases: number[] = [];
  public testCases: TestCase[] = [];
  public map: Map<string, TestCase[]> = new Map<string, TestCase[]>();
  public action: string = '';
  public local_data: any;
  ngOnInit(): void {
    this.testCaseService
      .findAllByProjectId(+this.data.id)
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
          console.log(this.data.test_cases_ids);
          console.log('==============');
          console.log(this.data.old_test_cases);
          if (this.data.test_cases_ids && this.data.old_test_cases) {
            this.data.old_test_cases.forEach((a: number) => {
              this.selectedTestCases.push(a);
            });

            testCase.isSelected =
              this.data.test_cases_ids.includes(testCase.caseId + '') ||
              this.data.test_cases_ids.includes(testCase.caseId);
          }
        }
      });
  }

  onSelectCase(event: any) {
    if (event.target.checked) {
      if (this.selectedTestCases.indexOf(event.target.value) < 0) {
        this.selectedTestCases.push(event.target.value);
      }
    } else {
      if (this.selectedTestCases.indexOf(event.target.value) > -1) {
        this.selectedTestCases.splice(
          this.selectedTestCases.indexOf(event.target.value),
          1
        );
      }
    }
    console.log(this.selectedTestCases);
  }

  onSelectAll(event: any, section_value: TestCase[]) {
    let arrayTemp: number[] = [];
    for (const testCase of section_value) {
      if (testCase.caseId) {
        arrayTemp.push(testCase.caseId);
      }
    }
    if (event.target.checked) {
      this.selectedTestCases = arrayTemp;
      arrayTemp.forEach((a) => {
        let checkbox = document.getElementById(
          'testcase-' + a
        ) as HTMLInputElement;
        checkbox.checked = true;
      });
    } else {
      this.selectedTestCases = [];
      arrayTemp.forEach((a) => {
        let checkbox = document.getElementById(
          'testcase-' + a
        ) as HTMLInputElement;
        checkbox.checked = false;
      });
    }
    console.log(this.selectedTestCases);
  }

  submit() {
    if (
      [...new Set(this.selectedTestCases)].every((x) =>
        this.data.old_test_cases.includes(x)
      ) &&
      this.selectedTestCases.length == this.data.old_test_cases.length &&
      this.data.old_test_cases.length > 0
    ) {
      this.sectionDialog.close({
        event: '',
        data: this.data.old_test_cases,
      });
    } else {
      console.log([...new Set(this.selectedTestCases)]);
      this.sectionDialog.close({
        event: '',
        data: [...new Set(this.selectedTestCases)],
      });
    }
  }

  close() {
    this.sectionDialog.close({ event: 'Cancel' });
  }
}
