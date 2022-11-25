import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddMilestoneComponent } from './components/project/milestones/add-milestone/add-milestone.component';
import { MilestonesComponent } from './components/project/milestones/milestones.component';
import { OverviewComponent } from './components/project/overview/overview.component';
import { ReportComponent } from './components/project/report/report.component';
import { AddTestRunComponent } from './components/project/test-run/add-test-run/add-test-run.component';
import { TestRunComponent } from './components/project/test-run/test-run.component';
import { TestcaseComponent } from './components/project/testcase/testcase.component';
import { MenuProjectComponent } from './shared/menu-project/menu-project.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AddTestCaseComponent } from './components/project/testcase/add-test-case/add-test-case.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    FormsModule,
    DpDatePickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 50000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
