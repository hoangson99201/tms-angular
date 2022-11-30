import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/models/result';
import { ResultService } from 'src/app/services/result.service';
import { AddResultComponent } from '../add-result/add-result.component';

@Component({
  selector: 'app-detail-test-run',
  templateUrl: './detail-test-run.component.html',
  styleUrls: ['./detail-test-run.component.scss'],
})
export class DetailTestRunComponent implements OnInit {
  public projectId: string = '';
  public subId: string = '';
  public results: Result[] = [];
  public map: Map<string, Result[]> = new Map<string, Result[]>();

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private resultService: ResultService) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      this.subId = params['subId'];
      console.log(this.projectId);
      console.log(this.subId);
      this.resultService.findAllByTestRunId(5).subscribe(results => {
        this.results = results;
        for (const result of results) {
          if (!result.sectionName) continue;
          let results = this.map.get(result.sectionName);
          if (!results) {
            this.map.set(result.sectionName, [result]);
          } else {
            results.push(result);
          }
        }
      })
    });
  }

  openDialog() {
    console.log('here');

    const dialogRef = this.dialog.open(AddResultComponent, {
      data: {
        type: 'add',
      },
    });
  }
}
