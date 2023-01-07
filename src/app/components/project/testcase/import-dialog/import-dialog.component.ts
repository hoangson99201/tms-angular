import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TestCaseService } from 'src/app/services/test-case.service';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent {
  constructor(
    private importDialog: MatDialogRef<ImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private testCaseService: TestCaseService,
    private toastr: ToastrService
  ) { }

  projectId: number = 0;
  uploadFile: File | undefined;
  isImporting: boolean = false;

  ngOnInit(): void {
    this.projectId = this.data
  }

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length) {
      this.uploadFile = fileList[0];
    }
  }

  import() {
    if (this.uploadFile) {
      this.isImporting = true;
      this.testCaseService.importTestCases(this.projectId, this.uploadFile).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success(res, 'Success');
          this.importDialog.close();
        },
        error: (e: HttpErrorResponse) => {
          console.log(e);
          this.toastr.error(e.error, 'Error');
          this.isImporting = false;
        },
      });
    }
  }

  downloadTemplate() {
    let csvContent = "data:text/csv;charset=utf-8,Title,Estimate,Priority,Section\r\n";
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "test_cases.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "test_cases.csv".
  }

  close() {
    this.importDialog.close();
  }
}
