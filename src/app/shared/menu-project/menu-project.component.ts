import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-menu-project',
  templateUrl: './menu-project.component.html',
  styleUrls: ['./menu-project.component.scss'],
})
export class MenuProjectComponent implements OnInit {
  constructor(private projectService: ProjectService) { }
  private project: Project = {
    projectName: ''
  };

  get projectId(): string {
    return this.project.projectId + '';
  }

  @Input() set projectId(value: string) {
    this.project.projectId = parseInt(value);
    this.projectService.findByProjectId(parseInt(this.projectId)).subscribe(project => {
      this.project.projectName = project.projectName;
      this.getProject.emit(this.project);
    });
  }

  @Output() getProject = new EventEmitter<Project>();

  public getProjectName() {
    return this.project.projectName;
  }

  public ngOnInit() {
    console.log(this.projectId);
  }
}
