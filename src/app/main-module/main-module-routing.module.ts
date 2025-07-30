import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponentComponent } from './main-view-component/main-view-component.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponentComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: ':id',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: ':id/tasks',
        component: TaskListComponent
      },
      // {
      //   path: 'dash',
      //   component: DashboardComponent
      // },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
