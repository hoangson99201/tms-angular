import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { OverviewComponent } from './components/project/overview/overview.component';
import { TestRunComponent } from './components/project/test-run/test-run.component';
import { TestcaseComponent } from './components/project/testcase/testcase.component';
import { ReportComponent } from './components/project/report/report.component';
import { AddTestRunComponent } from './components/project/test-run/add-test-run/add-test-run.component';
import { MenuProjectComponent } from './shared/menu-project/menu-project.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { MilestonesComponent } from './components/project/milestones/milestones.component';
import { AddMilestoneComponent } from './components/project/milestones/add-milestone/add-milestone.component';
import { AddTestCaseComponent } from './components/project/testcase/add-test-case/add-test-case.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AddProjectComponent,
    // ManageUserRolesComponent,
    // AddUserComponent,
    // ManageTestRunComponent,
    // ActivityHistoryComponent,
    // EditProjectComponent,
    // EditMilestoneComponent,
    AddMilestoneComponent,
    // ProjectTestRunComponent,
    // ManageTestCaseComponent,
    // AddResultComponent,
    AddTestCaseComponent,
    // AddSectionComponent,
    // ManageReportComponent,
    // AddReportComponent,
    // DetailReportComponent,
    MenuComponent,
    MenuProjectComponent,
    OverviewComponent,
    TestRunComponent,
    TestcaseComponent,
    ReportComponent,
    AddTestRunComponent,
    MilestonesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
