import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testcase',
  templateUrl: './testcase.component.html',
  styleUrls: ['./testcase.component.scss']
})
export class TestcaseComponent {
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
