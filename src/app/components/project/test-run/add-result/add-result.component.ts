import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Result } from 'src/app/models/result';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent implements OnInit {
  public color: string = '';
  constructor(
    private sectionDialog: MatDialogRef<AddResultComponent>,
    private resultService: ResultService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // this.color =
    this.result.status =
      this.data.status == 'Untested' ? 'Passed' : this.data.status;
    this.switchColor(this.result.status);
    this.result.resultId = this.data.id;
  }
  public result: Result = {
    resultId: 2,
    status: 'Blocked',
  };

  close() {
    this.sectionDialog.close();
  }

  switchColor(status: any) {
    switch (status) {
      case 'Passed':
        this.color = '#338a41';
        break;
      case 'Blocked':
        this.color = '#474747';
        break;
      case 'Retest':
        this.color = '#b99109';
        break;
      case 'Failed':
        this.color = '#a9093a';
        break;
    }
  }

  onChange(e: any) {
    this.switchColor(e.target.value);
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
