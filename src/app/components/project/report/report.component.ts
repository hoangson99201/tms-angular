import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  constructor(private route: ActivatedRoute,
    private reportService: ReportService,
    private datePipe: DatePipe,
    private authService: AuthService
    ) {}

  public listReport: Report[] = [];

  public projectId: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      this.reportService.findAllByProjectId(parseInt(this.projectId)).subscribe(reports => {
        console.log(reports);
        for (const report of reports) {
          report.createdOn = this.convertDate(report.createdOn)
        }
        this.listReport = reports;
      });
    });
  }

  convertDate(createdOn: string | number | undefined): string {
    if (createdOn === undefined) {
      return '';
    }
    if (!isNaN(Number(createdOn))) {
      createdOn = Number(createdOn) * 1000;
    }
    let date = this.datePipe.transform(createdOn, 'd/M/yyyy, h:mm a');
    if (date == null) {
      return '';
    }
    return date;
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
