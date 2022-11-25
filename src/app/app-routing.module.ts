import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMilestoneComponent } from './components/project/milestones/add-milestone/add-milestone.component';
import { AddTestCaseComponent } from './components/project/testcase/add-test-case/add-test-case.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { MilestonesComponent } from './components/project/milestones/milestones.component';
import { OverviewComponent } from './components/project/overview/overview.component';
import { ReportComponent } from './components/project/report/report.component';
import { AddTestRunComponent } from './components/project/test-run/add-test-run/add-test-run.component';
import { TestRunComponent } from './components/project/test-run/test-run.component';
import { TestcaseComponent } from './components/project/testcase/testcase.component';

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
    path: 'milestones-add/:id',
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
    path: 'test-cases/:id',
    component: TestcaseComponent,
  },

  {
    path: 'test-cases-add/:id',
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
