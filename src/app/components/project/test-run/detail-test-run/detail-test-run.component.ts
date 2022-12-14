import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/models/result';
import { ResultService } from 'src/app/services/result.service';
import { TestRunService } from 'src/app/services/test-run.service';
import { AddResultComponent } from '../add-result/add-result.component';

@Component({
  selector: 'app-detail-test-run',
  templateUrl: './detail-test-run.component.html',
  styleUrls: ['./detail-test-run.component.scss'],
})
export class DetailTestRunComponent implements OnInit {
  public projectId: string = '';
  public testRunId: string = '';
  public testRunName: string = '';
  public createDate: string = '';
  public isCompleted: boolean = false;
  public results: Result[] = [];
  public map: Map<string, Result[]> = new Map<string, Result[]>();
  public top: string = '';
  public left: string = '';
  @ViewChild('statusDropdown') statusDropdown: any;
  @ViewChild('button') button: any;
  public isMenuOpen = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private testRunService: TestRunService,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      this.testRunId = params['subId'];
      console.log(this.projectId);
      console.log(this.testRunId);
      this.refreshResult(parseInt(this.testRunId));
      this.testRunService
        .findByTestRunId(parseInt(this.testRunId))
        .subscribe((results) => {
          this.testRunName = results.runName;
          this.isCompleted = results.isCompleted ? results.isCompleted : false;
          this.createDate = results.createdOn
            ? results.createdOn[2] +
              '/' +
              results.createdOn[1] +
              '/' +
              results.createdOn[0]
            : '';
        });
    });
    document.addEventListener('click', (e) => {
      if (e.target instanceof Element) {
        if (!e.target.className.startsWith('custom-dropdown')) {
          this.top = '';
          this.left = '';
        }
      }
    });
  }

  refreshResult(testRunId: number) {
    this.resultService.findAllByTestRunId(testRunId).subscribe((results) => {
      this.results = results;
      this.map = new Map<string, Result[]>();
      for (const result of results) {
        if (!result.sectionName) continue;
        let results = this.map.get(result.sectionName);
        if (!results) {
          this.map.set(result.sectionName, [result]);
        } else {
          results.push(result);
        }
      }
    });
  }

  openDialog(status: any, id: any) {
    console.log('here');
    const dialogRef = this.dialog
      .open(AddResultComponent, {
        data: {
          status: status,
          id: id,
        },
      })
      .afterClosed()
      .subscribe((_) => {
        this.refreshResult(parseInt(this.testRunId));
      });
  }

  openDropDown(e: any) {
    var target = e.target || e.srcElement || e.currentTarget;
    console.log(target.getBoundingClientRect());
    this.left = target.getBoundingClientRect()['x'] + 'px';
    this.top = target.getBoundingClientRect()['y'] + 24 + 'px';
    console.log(this.isMenuOpen);
    console.log(this.top);
    console.log(this.left);
  }
}
