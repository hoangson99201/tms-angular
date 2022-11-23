import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-run',
  templateUrl: './test-run.component.html',
  styleUrls: ['./test-run.component.scss']
})
export class TestRunComponent {
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
