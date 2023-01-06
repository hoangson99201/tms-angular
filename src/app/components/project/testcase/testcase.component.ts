import { ImportDialogComponent } from './import-dialog/import-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Priority } from 'src/app/models/priority';
import { Section } from 'src/app/models/section';
import { TestCase } from 'src/app/models/test-case';
import { PriorityService } from 'src/app/services/priority.service';
import { SectionService } from 'src/app/services/section.service';
import { TestCaseService } from 'src/app/services/test-case.service';
import { AuthService } from './../../../services/auth.service';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { ExportDialogComponent } from './export-dialog/export-dialog.component';
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
    private authService: AuthService,
    private priorityService: PriorityService,
  ) { }
  public projectId: number = 0;
  public testCases: TestCase[] = [];
  public map: Map<string, TestCase[]> = new Map<string, TestCase[]>();
  public sections: Section[] = [];
  priorityMap: Map<number, Priority> = new Map<number, Priority>;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = parseInt(params['id']);
      console.log(this.projectId);
      this.refreshTestCase(this.projectId);
      this.refreshSections(this.projectId);
    });
    this.priorityService.findAll().subscribe((priorities) => {
      priorities.forEach(priority => {
        this.priorityMap.set(priority.prioritiesId, priority);
      })
    });
  }

  refreshSections(projectId: number) {
    this.sectionService.findAllByProjectId(projectId)
      .subscribe(sections => {
        this.sections = sections;
        console.log(sections);
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
        projectId: this.projectId
      },
    }).afterClosed()
      .subscribe(_ => {
        this.refreshSections(this.projectId);
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
          this.refreshTestCase(this.projectId);
        });
    }
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }

  openExportDialog() {
    this.dialog.open<ExportDialogComponent, Section[], string | string[] | undefined>(ExportDialogComponent, {
      data: this.sections
    }).afterClosed()
      .subscribe(selectedSections => {
        if (selectedSections === undefined) {
          return;
        }
        let selectedTestCases: TestCase[] = [];
        if (selectedSections == 'all') {
          selectedTestCases = this.testCases;
        } else if (selectedSections instanceof Array) {
          let selectedSectionSet = new Set(selectedSections.map(x => parseInt(x)));
          selectedTestCases = this.testCases.filter(x => x.sectionId && selectedSectionSet.has(x.sectionId));
        }
        console.log(selectedTestCases);
        this.toCsv(selectedTestCases);
      });
  }

  openImportDialog() {
    this.dialog.open<ImportDialogComponent, number>(ImportDialogComponent, {
      data: this.projectId
    }).afterClosed()
      .subscribe(_ => {
        this.refreshTestCase(this.projectId);
        this.refreshSections(this.projectId);
      });
  }

  toCsv(exportTestCases: TestCase[]) {
    // choose another string to temporally replace commas if necessary
    let stringToReplaceComas = ';';

    exportTestCases.forEach((singleRow) => {
      singleRow.caseName = singleRow.caseName.replace(/,/g, stringToReplaceComas);
      // singleRow.pr
    })
    let csvContent = "data:text/csv;charset=utf-8,Title,Estimate,Priority,Section\r\n";
    for (const testCase of exportTestCases) {
      if (!testCase.priorityId) {
        continue;
      }
      csvContent += testCase.caseName.replace(/,/g, stringToReplaceComas) + ',' + testCase.estimate + ','
        + this.priorityMap.get(testCase.priorityId)?.priorityName.replace(/,/g, stringToReplaceComas) + ','
        + testCase.sectionName?.replace(/,/g, stringToReplaceComas) + '\r\n';
    }

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "test_cases.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "test_cases.csv".
  }
}
