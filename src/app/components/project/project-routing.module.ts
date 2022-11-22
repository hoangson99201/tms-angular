import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMilestoneComponent } from '../add-milestone/add-milestone.component';
import { ManageMilestonesComponent } from '../manage-milestones/manage-milestones.component';
import { OverviewComponent } from './overview/overview.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: 'milestone',
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
    path: 'project/todo',
    component: TodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
