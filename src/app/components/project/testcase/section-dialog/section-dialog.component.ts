import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-section-dialog',
  templateUrl: './section-dialog.component.html',
  styleUrls: ['./section-dialog.component.scss'],
})
export class SectionDialogComponent implements OnInit {
  public dialogType: string = '';
  constructor(
    private sectionDialog: MatDialogRef<SectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.dialogType = this.data && this.data.type ? this.data.type : '';
  }
  close() {
    this.sectionDialog.close();
  }
}
