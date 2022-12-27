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
  ) { }

  public result: Result = {
    resultId: 2,
    status: 'Blocked',
  };
  public pendingUpload: File[] = [];
  public isProcessingFile: boolean = false;
  public base64Images: Array<string> = [];

  ngOnInit(): void {
    // this.color =
    this.result.status =
      this.data.status == 'Untested' ? 'Passed' : this.data.status;
    this.switchColor(this.result.status);
    this.result.resultId = this.data.id;
    if (this.result.resultId) {
      this.resultService.findByResultId(this.result.resultId).subscribe(result => {
        this.result = result;
        this.switchColor(this.result.status);
      })
    }
  }

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
    let formData = new FormData();
    formData.append("result", JSON.stringify(this.result));
    for (let i = 0; i < this.pendingUpload.length; i++) {
      const file = this.pendingUpload[i];
      formData.append("file_" + i, file);
    }
    this.resultService.update(formData).subscribe({
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

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
      this.pendingUpload = [];
      this.isProcessingFile = true;
      let promises: Promise<string>[] = [];
      for (let i = 0; i < fileList.length; i++) {
        promises.push(this.getBase64(fileList[i]));
        this.pendingUpload.push(fileList[i]);
      }
      Promise.all(promises).then(values => {
        this.base64Images = values;
        this.isProcessingFile = false;
      });
    }
  }

  getBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(typeof reader.result);
        if (reader.result instanceof ArrayBuffer || reader.result == null) {
          reject("wrong format file");
        } else {
          resolve(reader.result);
        }
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
        reject(error);
      };
    });
  }

  getPendingFileURL(index: number) {
    return URL.createObjectURL(this.pendingUpload[index]);
  }

  openNewTab(url: string) {
    window.open(url);
  }
}
