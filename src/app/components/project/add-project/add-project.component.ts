import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {

  constructor(private _location: Location, private projectService: ProjectService, private router: Router) {

  }

  project: Project = {
    projectName: ''
  }

  backClicked() {
    this._location.back();
  }

  submit() {
    this.projectService.addProject(this.project).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('');
    });
  }
}
