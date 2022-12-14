import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-milestone',
  templateUrl: './detail-milestone.component.html',
  styleUrls: ['./detail-milestone.component.scss']
})
export class DetailMilestoneComponent implements OnInit {
  public projectId: string = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      // this.refreshResult(parseInt(this.testRunId));
    });
  }
}
