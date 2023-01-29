import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router,
    private authService: AuthService
  ) { }
  public usersArray: User[] = [];
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
        let mapRoleId = new Map(rolesRes.map(i => [i.roleId, i]))
        // remove user have undefined role
        this.usersArray = usersRes.filter(x => x.roleId && mapRoleId.has(x.roleId));
        this.usersArray = this.usersArray.map(a => {
          return {
            ...a,
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

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }

  changeRole(changeTo: number) {
    this.user.roleId = changeTo;
    this.userService.update(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Update user role success', 'Success');
        this.router.navigateByUrl('/users-roles');
        this.refresh();
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
