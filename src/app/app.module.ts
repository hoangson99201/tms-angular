import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { AddUserComponent } from './components/project/add-project/manage-user-roles/add-user/add-user.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ManageUserRolesComponent } from './components/project/add-project/manage-user-roles/manage-user-roles.component';
import { SectionDialogComponent } from './components/project/testcase/section-dialog/section-dialog.component';
import { DetailTestRunComponent } from './components/project/test-run/detail-test-run/detail-test-run.component';
import { AddResultComponent } from './components/project/test-run/add-result/add-result.component';
import {MatSelectModule} from '@angular/material/select';
import { StatusDropdownComponent } from './components/project/test-run/detail-test-run/status-dropdown/status-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AddProjectComponent,
    ManageUserRolesComponent,
    AddUserComponent,
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
    MilestonesComponent,
    SidebarComponent,
    SectionDialogComponent,
    DetailTestRunComponent,
    AddResultComponent,
    StatusDropdownComponent
  ],
  entryComponents: [SectionDialogComponent, AddResultComponent, StatusDropdownComponent],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DpDatePickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    MatSelectModule
  ],
  providers: [SectionDialogComponent, AddResultComponent, StatusDropdownComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
