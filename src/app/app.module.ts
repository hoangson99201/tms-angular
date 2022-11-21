import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { AddProjectComponent } from './components/add-project/add-project.component';
// import { ManageUserRolesComponent } from './components/manage-user-roles/manage-user-roles.component';
// import { AddUserComponent } from './components/add-user/add-user.component';
import { ManageMilestonesComponent } from './components/manage-milestones/manage-milestones.component';
// import { ManageTestRunComponent } from './components/manage-test-run/manage-test-run.component';
// import { ActivityHistoryComponent } from './components/activity-history/activity-history.component';
// import { EditProjectComponent } from './components/edit-project/edit-project.component';
// import { EditMilestoneComponent } from './components/edit-milestone/edit-milestone.component';
// import { AddMilestoneComponent } from './components/add-milestone/add-milestone.component';
// import { AddTestRunComponent } from './components/add-test-run/add-test-run.component';
// import { ProjectTestRunComponent } from './components/project-test-run/project-test-run.component';
// import { ManageTestCaseComponent } from './components/manage-test-case/manage-test-case.component';
// import { AddResultComponent } from './components/add-result/add-result.component';
// import { AddTestCaseComponent } from './components/add-test-case/add-test-case.component';
// import { AddSectionComponent } from './components/add-section/add-section.component';
// import { ManageReportComponent } from './components/manage-report/manage-report.component';
// import { AddReportComponent } from './components/add-report/add-report.component';
// import { DetailReportComponent } from './components/detail-report/detail-report.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MenuProjectComponent } from './shared/menu-project/menu-project.component';
import { OverviewComponent } from './components/project/overview/overview.component';
import { TodoComponent } from './components/project/todo/todo.component';
import { ProjectComponent } from './components/project/project.component';
import { TestRunComponent } from './components/project/test-run/test-run.component';
import { TestcaseComponent } from './components/project/testcase/testcase.component';
import { ReportComponent } from './components/project/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    // AddProjectComponent,
    // ManageUserRolesComponent,
    // AddUserComponent,
    ManageMilestonesComponent,
    // ManageTestRunComponent,
    // ActivityHistoryComponent,
    // EditProjectComponent,
    // EditMilestoneComponent,
    // AddMilestoneComponent,
    // AddTestRunComponent,
    // ProjectTestRunComponent,
    // ManageTestCaseComponent,
    // AddResultComponent,
    // AddTestCaseComponent,
    // AddSectionComponent,
    // ManageReportComponent,
    // AddReportComponent,
    // DetailReportComponent,
    MenuComponent,
    MenuProjectComponent,
    OverviewComponent,
    TodoComponent,
    ProjectComponent,
    TestRunComponent,
    TestcaseComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
