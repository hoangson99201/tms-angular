import { User } from 'src/app/models/user';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {
  constructor(
    private confirmClose: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public users: User[]
  ) { }
  userId = 0;

  submit() {
    this.confirmClose.close(this.userId);
  }

  close() {
    this.confirmClose.close(0);
  }
}
