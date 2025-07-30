import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/projects';
import { Task } from 'src/app/models/task';
import { CommonService } from 'src/app/services/common.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: any = [];
  tasks: any = [];
  isVisible: any = false;
  arrStatus = [
    'Active', 'Completed'
  ];
  rows: any = [];
  invalidText = '';
  activeStatus: any = null;
  projectForm!: FormGroup;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private projectService: ProjectsService,
    private toastService: ToastServiceService,
  ) {
    // this.projectForm = this.fb.group({
    //   id: new FormControl(null, []),
    //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   owner: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   status: new FormControl('Active', [Validators.required]),
    //   description: new FormControl('', [Validators.required]),
    //   tasks: new FormControl([]),
    // });

  }


  ngOnInit(): void {

    this.invalidText = this.commonService.invalidInput;
    // debugger
    this.projectService.projects$
      .subscribe(data => {

        this.projects = data;
        this.rows = data;
        this.activeStatus = null;

      });

    this.projectService.task$
      .subscribe(data => {
        this.tasks = data;
        // console.log('this.tasks', this.tasks);

        // this.rows = data;
        // this.activeStatus = null;

      });

    this.initializeForm();


  }

  getNextDueTask(project: Project): Task | null {
    // Filter out completed tasks and sort by due date  
    const projectTask = this.tasks.filter((x: any) => x.projectId == Number(project.id));
    if (!projectTask || projectTask.length === 0) return null;
    const upcoming = projectTask
      .filter((t: any) => t.status !== 'Completed')
      .sort((a: any, b: any) => +new Date(a.dueDate) - +new Date(b.dueDate));

    return upcoming.length ? upcoming[0] : null;
  }

  expandedRows: any = {};
  isRowExpanded(project: any): boolean {
    return !!this.expandedRows[project.id];
  }

  toggleRow(project: any) {
    this.expandedRows[project.id] = !this.expandedRows[project.id];

  }

  getProjectProgress(project: Project): number {
    if (!project.tasks.length) return 0;
    const projectTasks = this.tasks.filter((task: any) => task.projectId == project.id);
    if (projectTasks.length === 0) return 0;
    const completed = projectTasks.filter((t: any) => t.status === 'Completed').length;
    return Math.round((completed / project.tasks.length) * 100);

  }

  saveProject() {
    if (this.projectForm?.valid) {
      this.commonService.showLoader();
      const rand_id = this.generateNumericId(2);
      const check = this.projectForm.value?.id;
      let req = { ...this.projectForm.value };
      if (!check) {
        req.id = rand_id;
      }

      setTimeout(() => {
        check ? this.projectService.updateProject(req) :
          this.projectService.addProject(req);
        this.isVisible = false;
        this.commonService.hideLoader();
        this.toastService.showToast('success', 'Success', check ? 'project updated successfully' : 'project added successfully');
      }, 1000);

    }

  }

  deleteProject(project: Project) {
    if (project?.id) {
      this.commonService.showLoader();
      setTimeout(() => {
        this.projectService.deleteProject(project.id);
        this.projectService.deleteTask(project.id);
        this.commonService.hideLoader();
        // this.isVisible = false;
        this.toastService.showToast('success', 'Success', 'project delete successfully');
      }, 1000);
    }
  }

  generateNumericId(length: number = 6): number {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // "id": 2,
  //     "name": "Mobile App Launch",
  //     "owner": "Bob",
  //     "status": "Completed",
  //     "description": "Launch Android and iOS versions",
  //     "tasks"

  initializeForm() {
    // Project Name, Description, Owner, Status (Active/Completed)
    this.projectForm = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      owner: new FormControl('', [Validators.required, Validators.minLength(3)]),
      status: new FormControl('Active', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      tasks: new FormControl([]),
    });
  }

  openModal() {
    this.projectForm.reset();
    this.isVisible = true;
    this.initializeForm();
  }

  filterByStatus(event: any) {
    if (event && event.value) {
      this.rows = this.projects.filter((x: any) => x.status == event.value);

    } else {
      this.rows = [...this.projects];
    }


  }

  closeModal() {
    this.projectForm.reset();
    this.isVisible = false;
  }

  editProject(project: Project) {
    this.projectForm.reset();
    this.projectForm.setValue(
      {
        ...project
      }
    );
    this.commonService.showLoader();
    setTimeout(() => {
      this.isVisible = true;
      this.commonService.hideLoader();
    }, 1000);



  }
  viewTasks(project: Project) {
    this.commonService.showLoader();

    setTimeout(() => {
      if (project?.id) {
        this.router.navigate([`projects/${project.id}/tasks`])
      }
      this.commonService.hideLoader();

    }, 1000);

  }

}
