import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.scss'],
})
export class ManageUserRolesComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  public usersArray: any[] = [];
  public userId: any = '';
  public rolesArray: Role[] = [];
  public displayTab: string = 'user';
  public top: string = '';
  public left: string = '';
  public user: User = {
    roleId: undefined,
    userId: undefined,
  };
  ngOnInit(): void {
    this.refresh();
    document.addEventListener('click', (e) => {
      this.eventDropdown(e);
    });
  }

  refresh() {
    this.userService.getUsers().subscribe((usersRes) => {
      this.roleService.findAll().subscribe((rolesRes) => {
        console.log(rolesRes);
        this.rolesArray = [...rolesRes];
        this.usersArray = [...usersRes];
        this.usersArray = this.usersArray.map((a, i) => {
          return {
            ...a,
            isProjectAdmin: rolesRes.find((b) => {
              return b.roleId == a.roleId;
            })?.isProjectAdmin,
            roleName: rolesRes.find((b) => {
              return b.roleId == a.roleId;
            })?.roleName,
          };
        });
      });
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', (e) => {
      this.eventDropdown(e);
    });
  }

  eventDropdown(e: MouseEvent) {
    if (e.target instanceof Element) {
      if (!e.target.className.startsWith('custom-dropdown')) {
        this.top = '';
        this.left = '';
      }
    }
  }

  switchTab(tab: string) {
    this.displayTab = tab == 'user' ? tab : 'role';
  }

  changeRole(changeTo: number) {
    this.user.roleId = changeTo;
    this.userService.update(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Update user role success', 'Success');
        this.router.navigateByUrl('/users-roles');
        this.refresh()
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Update user role failed', 'Error');
      },
    });
  }

  openDropDown(e: any, userId: any) {
    this.user.userId = userId;
    var target = e.target || e.srcElement || e.currentTarget;
    console.log(target.getBoundingClientRect());
    this.left = target.getBoundingClientRect()['x'] + 5 + 'px';
    this.top = target.getBoundingClientRect()['y'] + 21 + 'px';
    console.log(this.user.userId);
  }
}
