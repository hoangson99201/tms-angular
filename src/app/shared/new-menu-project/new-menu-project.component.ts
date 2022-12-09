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
  constructor(private projectService: ProjectService) {}
  public selectedMenu = 'overview';
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
          this.project.projectName = project.projectName;
          this.getProject.emit(this.project);
        });
    }
  }

  @Output() getProject = new EventEmitter<Project>();

  public getProjectName() {
    return this.project.projectName;
  }

  public ngOnInit() {}

  public getFullname() {
    console.log('activeUser' + AuthService.activeUser);
    return AuthService.activeUser.fullname;
  }

  classSelected(value: any) {
    this.selectedMenu = value;
  }
}
