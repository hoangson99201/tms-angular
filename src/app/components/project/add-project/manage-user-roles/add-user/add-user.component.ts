import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {
  constructor(
    private _location: Location,
    private roleService: RoleService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  public roles: Role[] = [];
  public user: User = {
    email: '',
    fullname: '',
    password: ''
  };
  public confirmPassword: string = '';

  ngOnInit(): void {
    this.roleService.findAll().subscribe(roles => {
      this.roles = roles;
      console.log(roles);
    })
  }

  backClicked() {
    this._location.back();
  }

  submit() {
    this.userService.create(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Add user success', 'Success');
        this.router.navigateByUrl('');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Add user failed', 'Error');
      },
    });
  }
}
