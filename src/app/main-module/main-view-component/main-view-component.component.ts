import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/projects';
import { Task } from 'src/app/models/task';
import { CommonService } from 'src/app/services/common.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-main-view-component',
  templateUrl: './main-view-component.component.html',
  styleUrls: ['./main-view-component.component.scss']
})
export class MainViewComponentComponent implements OnInit {

  projects: Project[] = [];
  tasks: Task[] = [];
  overDue = 0;

  constructor(
    private commonService: CommonService,
    private ProjectService: ProjectsService,
    private toastService: ToastServiceService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    // console.log('main-view-component');
    this.ProjectService.getProjects().subscribe(data => {
      this.projects = data;

    });

    this.ProjectService.getTasks().subscribe(data => {
      this.tasks = data;
      // this.overDue = this.getProjectProgress();
    });


  };

  homeRoute() {
    // debugger
  }

  getCompletedTask(): any {
    if (!this.tasks.length) return 0;
    // const projectTasks = this.tasks.filter((task: any) => task.projectId == project.id);
    // if (projectTasks.length === 0) return 0;
    const completed: any = this.tasks.filter((t: any) => t.status === 'Completed').length;
    return completed;
    // return Math.round((completed / project.tasks.length) * 100);

  };

  getProjectProgress(): any {
    if (!this.tasks.length) return 0;
    // const projectTasks = this.tasks.filter((task: any) => task.projectId == project.id);
    // if (projectTasks.length === 0) return 0;
    const overDue: any = this.tasks.filter((t: any) => t.status !== 'Completed').length;
    return overDue;
    // return Math.round((completed / project.tasks.length) * 100);

  }

  logout() {
    this.commonService.showLoader();
    this.commonService.signOut();
    localStorage.clear();
    setTimeout(() => {
      this.commonService.hideLoader();
      this.router.navigate(['login']);
      this.toastService.showToast('success', 'Success', 'User logout successfully')

    }, 1000);
  }




}
