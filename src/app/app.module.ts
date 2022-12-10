import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddUserComponent } from './components/project/add-project/manage-user-roles/add-user/add-user.component';
import { ManageUserRolesComponent } from './components/project/add-project/manage-user-roles/manage-user-roles.component';
import { AddMilestoneComponent } from './components/project/milestones/add-milestone/add-milestone.component';
import { MilestonesComponent } from './components/project/milestones/milestones.component';
import { OverviewComponent } from './components/project/overview/overview.component';
import { ReportComponent } from './components/project/report/report.component';
import { AddResultComponent } from './components/project/test-run/add-result/add-result.component';
import { AddTestRunComponent } from './components/project/test-run/add-test-run/add-test-run.component';
import { DetailTestRunComponent } from './components/project/test-run/detail-test-run/detail-test-run.component';
import { StatusDropdownComponent } from './components/project/test-run/detail-test-run/status-dropdown/status-dropdown.component';
import { TestRunComponent } from './components/project/test-run/test-run.component';
import { AddTestCaseComponent } from './components/project/testcase/add-test-case/add-test-case.component';
import { SectionDialogComponent } from './components/project/testcase/section-dialog/section-dialog.component';
import { TestcaseComponent } from './components/project/testcase/testcase.component';
import { MenuProjectComponent } from './shared/menu-project/menu-project.component';
import { MenuComponent } from './shared/menu/menu.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SelectCaseDialogComponent } from './components/project/test-run/add-test-run/select-case-dialog/select-case-dialog.component';
import { ConfirmCloseDialogComponent } from './components/project/test-run/confirm-close-dialog/confirm-close-dialog.component';
import { AuthInterceptor } from './core/authenticator';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { NewMenuComponent } from './shared/new-menu/new-menu.component';
import { NewMenuProjectComponent } from './shared/new-menu-project/new-menu-project.component';
import { SearchComponent } from './shared/search/search.component';

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
    StatusDropdownComponent,
    SelectCaseDialogComponent,
    ConfirmCloseDialogComponent,
    LoginComponent,
    NewMenuComponent,
    NewMenuProjectComponent,
    SearchComponent
  ],
  entryComponents: [SectionDialogComponent, AddResultComponent, StatusDropdownComponent, SelectCaseDialogComponent, ConfirmCloseDialogComponent],
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
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: AuthService.authServiceFactory,
    deps: [AuthService],
    multi: true
  }, SectionDialogComponent, AddResultComponent, StatusDropdownComponent, SelectCaseDialogComponent, ConfirmCloseDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
