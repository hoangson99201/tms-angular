import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMilestoneComponent } from './components/project/milestones/add-milestone/add-milestone.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { MilestonesComponent } from './components/project/milestones/milestones.component';
import { OverviewComponent } from './components/project/overview/overview.component';
import { ReportComponent } from './components/project/report/report.component';
import { AddTestRunComponent } from './components/project/test-run/add-test-run/add-test-run.component';
import { TestRunComponent } from './components/project/test-run/test-run.component';
import { TestcaseComponent } from './components/project/testcase/testcase.component';
import { TodoComponent } from './components/project/todo/todo.component';
import { AddTestCaseComponent } from './components/project/testcase/add-test-case/add-test-case.component';

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
    path: 'milestones/add',
    component: AddMilestoneComponent,
  },
  {
    path: 'overview/:id',
    component: OverviewComponent,
  },
  {
    path: 'todo/:id',
    component: TodoComponent,
  },
  {
    path: 'test-runs/:id',
    component: TestRunComponent,
  },
  {
    path: 'test-runs/add',
    component: AddTestRunComponent,
  },
  {
    path: 'test-cases/:id',
    component: TestcaseComponent,
  },

  {
    path: 'test-cases/add',
    component: AddTestCaseComponent,
  },
  {
    path: 'reports/:id',
    component: ReportComponent,
  },
  {
    path: 'project/add',
    component: AddProjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
