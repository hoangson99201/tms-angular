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
        this.listReport = reports;
      });
    });
  }
}
