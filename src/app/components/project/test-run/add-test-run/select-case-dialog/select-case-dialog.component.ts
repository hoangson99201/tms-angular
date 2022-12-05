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
  ) { }

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
    this.sectionDialog.close({
      event: this.action,
      data: this.selectedTestCases,
    });
  }

  close() {
    this.sectionDialog.close({ event: 'Cancel' });
  }
}
