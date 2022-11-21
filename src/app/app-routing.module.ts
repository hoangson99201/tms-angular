import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMilestoneComponent } from './components/add-milestone/add-milestone.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageMilestonesComponent } from './components/manage-milestones/manage-milestones.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'milestone',
    component: ManageMilestonesComponent
  },
  {
    path: 'add-milestone',
    component: AddMilestoneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
