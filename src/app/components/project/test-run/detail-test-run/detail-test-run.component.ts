import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddResultComponent } from '../add-result/add-result.component';

@Component({
  selector: 'app-detail-test-run',
  templateUrl: './detail-test-run.component.html',
  styleUrls: ['./detail-test-run.component.scss'],
})
export class DetailTestRunComponent implements OnInit {
  public projectId: string = '';
  public subId: string = '';

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      this.subId = params['subId'];
      console.log(this.projectId);
      console.log(this.subId);
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
