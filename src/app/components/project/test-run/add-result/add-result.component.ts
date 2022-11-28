import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss'],
})
export class AddResultComponent {
  constructor(private sectionDialog: MatDialogRef<AddResultComponent>) {}
  close() {
    this.sectionDialog.close();
  }
}
