import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  constructor(
    private _location: Location,
    private projectService: ProjectService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  project: Project = {
    projectName: '',
  };

  backClicked() {
    this._location.back();
  }

  submit() {

    this.projectService.addProject(this.project).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add project success', 'Success');
        this.router.navigate(['/overview', res.projectId]);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Add project failed', 'Error');
      },
    });
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
