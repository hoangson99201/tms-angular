import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-close-dialog',
  templateUrl: './confirm-close-dialog.component.html',
  styleUrls: ['./confirm-close-dialog.component.scss'],
})
export class ConfirmCloseDialogComponent {
  constructor(
    private confirmClose: MatDialogRef<ConfirmCloseDialogComponent>
  ) {}
  submit() {
    this.confirmClose.close({
      event: 'Close',
    });
  }

  close() {
    this.confirmClose.close({ event: 'Cancel' });
  }
}
