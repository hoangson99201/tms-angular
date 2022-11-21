import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMilestoneComponent } from './components/add-milestone/add-milestone.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageMilestonesComponent } from './components/manage-milestones/manage-milestones.component';
import { OverviewComponent } from './components/project/overview/overview.component';
import { ReportComponent } from './components/project/report/report.component';
import { TestRunComponent } from './components/project/test-run/test-run.component';
import { TestcaseComponent } from './components/project/testcase/testcase.component';
import { TodoComponent } from './components/project/todo/todo.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'milestones',
    component: ManageMilestonesComponent,
  },
  {
    path: 'add-milestone',
    component: AddMilestoneComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'todo',
    component: TodoComponent,
  },
  {
    path: 'test-runs',
    component: TestRunComponent,
  },
  {
    path: 'test-cases',
    component: TestcaseComponent,
  },
  {
    path: 'reports',
    component: ReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
