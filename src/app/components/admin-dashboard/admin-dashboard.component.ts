import { AuthService } from 'src/app/services/auth.service';
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
  refresh(projectName: string): void {
    this.projectName = projectName;
    this.projectService.getProjects(this.getParams(), projectName).subscribe(reponse => {
      this.projects = reponse.list;
      this.length = reponse.length;
      this.activeProject = this.projects.filter(x => !x.completed).length;
      this.completedProject = this.projects.filter(x => x.completed).length;
    });
  }

  projects: Project[] = [];
  activeProject = 0;
  completedProject = 0;
  projectName: string = '';

  constructor(private projectService: ProjectService, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.refresh(this.projectName);
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
