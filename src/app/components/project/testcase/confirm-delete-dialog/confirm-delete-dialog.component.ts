import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  constructor(
    private sectionDialog: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private testCaseService: TestCaseService,
    private toastr: ToastrService
  ) { }

  testCaseId = 0;

  ngOnInit(): void {
    console.log(this.data);
    this.testCaseId = this.data?.testCaseId;
  }

  close() {
    this.sectionDialog.close();
  }

  delete() {
    this.testCaseService.delete(this.testCaseId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.deletedCount == 0) {
          this.toastr.error('Test case is running or not available', 'Delete test case failed');
        } else {
          this.toastr.success('Delete test case success', 'Success');
        }
        this.sectionDialog.close();
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Test case is running or not available', 'Delete test case failed');
        this.sectionDialog.close();
      },
    });
  }
}
