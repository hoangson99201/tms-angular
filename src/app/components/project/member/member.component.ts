import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectUser } from 'src/app/models/projectUser';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private memberService: MemberService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  projectId = 0;
  projectUsers: ProjectUser[] = []
  users: User[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      console.log(this.projectId);
      this.refreshProjectUsers(this.projectId);
      this.userService.getUsers().subscribe(users => {
        this.users = users;
      });
    });
  }

  refreshProjectUsers(projectId: number) {
    this.memberService.findAllByProjectId(projectId).subscribe(projectUsers => {
      console.log(projectUsers);
      this.projectUsers = projectUsers;
    });
  }

  openDeleteDialog(projectUser: ProjectUser) {
    this.dialog.open<ConfirmDeleteDialogComponent, string, string>(ConfirmDeleteDialogComponent, {
      data: projectUser.email
    }).afterClosed()
      .subscribe(command => {
        if (command === undefined || command === 'cancel' || projectUser.projectUserId === undefined) {
          return;
        }
        if (command === 'delete') {
          this.memberService.delete(projectUser.projectUserId).subscribe({
            next: (res) => {
              console.log(res);
              if (res.deletedCount == 0) {
                this.toastr.error('User is not available', 'Delete member failed');
              } else {
                this.toastr.success('Delete member success', 'Success');
              }
            },
            error: (e) => {
              console.log(e);
              this.toastr.error('User is not available', 'Delete member failed');
            },
            complete: () => this.refreshProjectUsers(this.projectId)
          });
        }
      });
  }

  openCreateDialog() {
    let setProjectUserId = new Set(this.projectUsers.map(x => x.userId));
    let unSetUsers = this.users.filter(x => x.userId && !setProjectUserId.has(x.userId));
    this.dialog.open<AddDialogComponent, User[], number>(AddDialogComponent, {
      data: unSetUsers
    }).afterClosed()
      .subscribe(userId => {
        if (!userId) {
          return;
        }
        this.memberService.create({ projectId: this.projectId, userId: userId }).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Add member success', 'Success');
            this.refreshProjectUsers(this.projectId);
          },
          error: (e) => {
            console.log(e);
            this.toastr.error('Add member failed', 'Error');
            this.refreshProjectUsers(this.projectId);
          },
        });
      });
  }

  isActive(functionalityName: string) {
    return this.authService.isActive(functionalityName);
  }
}
