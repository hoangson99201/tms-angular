import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-project',
  templateUrl: './menu-project.component.html',
  styleUrls: ['./menu-project.component.scss'],
})
export class MenuProjectComponent implements OnInit {
  constructor() {}

  @Input() projectId = '';
  public ngOnInit() {
    console.log(this.projectId);
  }
}
