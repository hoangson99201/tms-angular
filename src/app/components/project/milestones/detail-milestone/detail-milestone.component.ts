import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/models/result';
import { MilestoneService } from 'src/app/services/milestone.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-detail-milestone',
  templateUrl: './detail-milestone.component.html',
  styleUrls: ['./detail-milestone.component.scss']
})
export class DetailMilestoneComponent implements OnInit {
  public projectId: string = '';
  public testRunId: string = '';
  public milestoneName: string = '';
  public dueDate: string = '';
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
    private resultService: ResultService,
    private milestoneService: MilestoneService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      this.testRunId = params['subId'];
      console.log(this.projectId);
      console.log(this.testRunId);
      this.refreshResult(parseInt(this.testRunId));
      this.milestoneService
        .findByMilestoneId(parseInt(this.testRunId))
        .subscribe((results) => {
          this.milestoneName = results.milestoneName;
          this.isCompleted = results.isCompleted ? results.isCompleted : false;
          this.dueDate = results.endDate
            ? results.endDate[2] +
              '/' +
              results.endDate[1] +
              '/' +
              results.endDate[0]
            : '';
        });
    });
    // document.addEventListener('click', (e) => {
    //   if (e.target instanceof Element) {
    //     if (!e.target.className.startsWith('custom-dropdown')) {
    //       this.top = '';
    //       this.left = '';
    //     }
    //   }
    // });
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
