import { Section } from 'src/app/models/section';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {
  constructor(
    private exportDialog: MatDialogRef<ExportDialogComponent, string | string[] | undefined>,
    @Inject(MAT_DIALOG_DATA) public data: Section[]
  ) { }

  sections: Section[] = [];
  selectedSections: string[] | undefined;
  exportType: string = 'all';

  ngOnInit(): void {
    this.sections = this.data
  }

  export() {
    this.exportDialog.close(this.exportType == 'all' ? this.exportType : this.selectedSections);
  }

  close() {
    this.exportDialog.close();
  }

  log() {
    console.log(this.selectedSections + ' ' + this.exportType);
  }
}
