import { ToastrService } from 'ngx-toastr';
import { SectionService } from 'src/app/services/section.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Section } from 'src/app/models/section';

@Component({
  selector: 'app-section-dialog',
  templateUrl: './section-dialog.component.html',
  styleUrls: ['./section-dialog.component.scss'],
})
export class SectionDialogComponent implements OnInit {
  public dialogType: string = '';
  public section: Section = {
    sectionName: '',
    projectId: 1,
  };
  constructor(
    private sectionDialog: MatDialogRef<SectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sectionService: SectionService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    console.log(this.data);
    this.dialogType = this.data && this.data.type ? this.data.type : '';
  }
  close() {
    this.sectionDialog.close();
  }

  submit() {
    this.sectionService.create(this.section).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add section success', 'Success');
        this.close();
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Add section failed', 'Error');
      },
    });
  }
}
