import { Component, OnInit } from '@angular/core';
import { BasePaginator } from 'src/app/core/base-paginator';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent extends BasePaginator implements OnInit {
  refresh(): void {
    this.projectService.getProjects(this.getParams()).subscribe(reponse => {
      this.projects = reponse.list;
      this.length = reponse.length;
      this.activeProject = this.projects.filter(x => !x.completed).length;
      this.completedProject = this.projects.filter(x => x.completed).length;
    });
  }

  projects: Project[] = [];
  activeProject = 0;
  completedProject = 0;

  constructor(private projectService: ProjectService) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }
}
