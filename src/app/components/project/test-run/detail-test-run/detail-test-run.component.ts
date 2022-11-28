import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddResultComponent } from '../add-result/add-result.component';

@Component({
  selector: 'app-detail-test-run',
  templateUrl: './detail-test-run.component.html',
  styleUrls: ['./detail-test-run.component.scss'],
})
export class DetailTestRunComponent {
  constructor(
    public dialog: MatDialog
  ) {

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
