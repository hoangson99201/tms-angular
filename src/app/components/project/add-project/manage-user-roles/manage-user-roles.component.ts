import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.scss'],
})
export class ManageUserRolesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}
  public usersArray: any[] = [];
  public rolesArray: Role[] = [];
  public displayTab: string = 'user';
  ngOnInit(): void {
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
          };
        });
        console.log(this.usersArray);
      });
    });
  }

  switchTab(tab: string) {
    this.displayTab = tab == 'user' ? tab : 'role';
  }
}
