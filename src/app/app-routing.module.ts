import { DetailReportComponent } from './components/project/report/detail-report/detail-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddUserComponent } from './components/project/add-project/manage-user-roles/add-user/add-user.component';
import { ManageUserRolesComponent } from './components/project/add-project/manage-user-roles/manage-user-roles.component';
import { AddMilestoneComponent } from './components/project/milestones/add-milestone/add-milestone.component';
import { DetailMilestoneComponent } from './components/project/milestones/detail-milestone/detail-milestone.component';
import { MilestonesComponent } from './components/project/milestones/milestones.component';
import { OverviewComponent } from './components/project/overview/overview.component';
import { AddReportComponent } from './components/project/report/add-report/add-report.component';
import { ReportComponent } from './components/project/report/report.component';
import { AddTestRunComponent } from './components/project/test-run/add-test-run/add-test-run.component';
import { DetailTestRunComponent } from './components/project/test-run/detail-test-run/detail-test-run.component';
import { TestRunComponent } from './components/project/test-run/test-run.component';
import { AddTestCaseComponent } from './components/project/testcase/add-test-case/add-test-case.component';
import { TestcaseComponent } from './components/project/testcase/testcase.component';
import { SearchDetailProjectComponent } from './components/search-detail-project/search-detail-project.component';
import { SignUpComponent } from './components/signup/signup.component';
import { MemberComponent } from './components/project/member/member.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'milestones/:id',
    component: MilestonesComponent,
  },
  {
    path: 'milestones/:id/detail/:subId',
    component: DetailMilestoneComponent,
  },
  {
    path: 'milestones-add/:id',
    component: AddMilestoneComponent,
  },
  {
    path: 'milestones-edit/:id',
    component: AddMilestoneComponent,
  },
  {
    path: 'overview/:id',
    component: OverviewComponent,
  },
  {
    path: 'test-runs/:id',
    component: TestRunComponent,
  },
  {
    path: 'test-runs-add/:id',
    component: AddTestRunComponent,
  },
  {
    path: 'test-runs-add/:id/rerun/:rerun-id',
    component: AddTestRunComponent,
  },
  {
    path: 'test-runs-edit/:id',
    component: AddTestRunComponent,
  },
  {
    path: 'test-runs/:id/detail/:subId',
    component: DetailTestRunComponent,
  },
  {
    path: 'test-cases/:id',
    component: TestcaseComponent,
  },
  {
    path: 'test-cases-add/:id',
    component: AddTestCaseComponent,
  },
  {
    path: 'test-cases-edit/:id',
    component: AddTestCaseComponent,
  },
  {
    path: 'reports/:id',
    component: ReportComponent,
  },
  {
    path: 'reports/view/:id',
    component: DetailReportComponent,
  },
  {
    path: 'reports-add/:id',
    component: AddReportComponent,
  },
  {
    path: 'project/add',
    component: AddProjectComponent,
  },
  {
    path: 'users-roles',
    component: ManageUserRolesComponent,
  },
  {
    path: 'user-role/add',
    component: AddUserComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'search/:id',
    component: SearchDetailProjectComponent,
  },
  {
    path: 'members/:id',
    component: MemberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
