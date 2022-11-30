import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Result } from 'src/app/models/result';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent {
  constructor(private sectionDialog: MatDialogRef<AddResultComponent>, private resultService: ResultService, private toastr: ToastrService) { }
  public result: Result = {
    resultId: 2,
    status: 'Blocked'
  }

  close() {
    this.sectionDialog.close();
  }

  submit() {
    this.resultService.update(this.result).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add result success', 'Success');
        this.close();
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Add result failed', 'Error');
      },
    });
  }
}
