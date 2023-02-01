import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-new-menu-project',
  templateUrl: './new-menu-project.component.html',
  styleUrls: ['./new-menu-project.component.scss'],
})
export class NewMenuProjectComponent {
  constructor(private projectService: ProjectService, private authService: AuthService) { }
  @Input() public selectedMenu = 'overview';
  private project: Project = {
    projectName: '',
  };

  get projectId(): string {
    return this.project.projectId + '';
  }

  @Input() set projectId(value: string) {
    this.project.projectId = parseInt(value);
    if (this.project.projectId) {
      this.projectService
        .findByProjectId(parseInt(this.projectId))
        .subscribe((project) => {
          if (project.endDate instanceof Array) {
            project.endDate = project.endDate[0] + "-" + String(project.endDate[1]).padStart(2, '0') + "-" + String(project.endDate[2]).padStart(2, '0');
          }
          if (project.startDate instanceof Array) {
            project.startDate = project.startDate[0] + "-" + String(project.startDate[1]).padStart(2, '0') + "-" + String(project.startDate[2]).padStart(2, '0');
          }
          this.project.projectName = project.projectName;
          this.project.startDate = project.startDate;
          this.project.endDate = project.endDate;
          this.getProject.emit(this.project);
        });
    }
  }

  @Output() getProject = new EventEmitter<Project>();

  public getProjectName() {
    return this.project.projectName;
  }

  public getFullname() {
    console.log('activeUser' + AuthService.activeUser);
    return AuthService.activeUser.fullname;
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
