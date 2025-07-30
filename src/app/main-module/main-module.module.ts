import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { MainViewComponentComponent } from './main-view-component/main-view-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { TaskDialogFormComponent } from './task-dialog-form/task-dialog-form.component';




@NgModule({
  declarations: [
    MainViewComponentComponent,
    DashboardComponent,
    ProjectListComponent,
    TaskListComponent,
    TaskDialogFormComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    PanelModule,
    CalendarModule,
    TagModule,
    CardModule
  ]
})
export class MainModuleModule { }
