import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    NgIf,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    ChartModule,
    TableModule,
    DialogModule
  ]
})
export class MainModuleModule { }
