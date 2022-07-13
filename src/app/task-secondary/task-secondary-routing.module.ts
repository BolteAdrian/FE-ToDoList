import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: 'task-secondary',
    redirectTo: 'task-secondary/:taskId',
    pathMatch: 'full',
  },
  { path: 'task-secondary/:taskId', component: IndexComponent },
  { path: 'task-secondary/:taskId/view', component: ViewComponent },
  { path: 'childs/create', component: CreateComponent },
  { path: 'task-secondary/:taskId/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskSecondaryRoutingModule {}
