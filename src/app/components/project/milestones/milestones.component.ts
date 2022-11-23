import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent {
  constructor(private route: ActivatedRoute) {}
  public projectId: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
    });
  }
}
