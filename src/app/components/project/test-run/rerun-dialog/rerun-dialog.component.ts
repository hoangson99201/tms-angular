import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TestRunService } from 'src/app/services/test-run.service';

@Component({
  selector: 'app-rerun-dialog',
  templateUrl: './rerun-dialog.component.html',
  styleUrls: ['./rerun-dialog.component.scss'],
})
export class RerunDialogComponent {
  constructor(
    private testRunService: TestRunService,
    private rerunDialog: MatDialogRef<RerunDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  selectedStatus = new Set();
  submit() {
    this.testRunService.setData([...this.selectedStatus]);
    // test-runs-add/:id/rerun/:rerun-id

    this.rerunDialog.close();
    this.router.navigateByUrl(
      '/test-runs-add/' + this.data.projectId + '/rerun/' + this.data.testrunId
    );
  }
  close() {
    this.rerunDialog.close({
      event: '',
    });
  }
  select(status: string) {
    this.selectedStatus.add(status);
  }

  selectAll() {
    this.selectedStatus = new Set(this.statusArray.map((a) => a.status));
    this.statusArray.forEach((a) => (a.isSelected = true));
    console.log(this.statusArray);

  }

  clearAll() {
    this.selectedStatus = new Set();
    this.statusArray.forEach((a) => (a.isSelected = false));
    console.log(this.statusArray);
  }

  statusArray = [
    { status: 'Passed', isSelected: false },
    { status: 'Blocked', isSelected: false },
    { status: 'Retest', isSelected: false },
    { status: 'Failed', isSelected: false },
  ];
}
