import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Task } from 'src/app/models/task';
import { CommonService } from 'src/app/services/common.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasksList: Task[] = [];
  rows: any = [];
  projectId: any = null;
  project: any;
  activeStatus = null;
  activePriority = null;
  arrStatus = [
    'Active', 'Pending', 'In Progress', 'Completed',
  ];
  arrPriority = [
    'High', 'Medium', 'Low'
  ];
  // taskForm!: FormGroup;
  isVisible = false;
  invalidText = '';


  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private commonService: CommonService,
    private toastService: ToastServiceService,
  ) {

  }

  ngOnInit(): void {

    this.invalidText = this.commonService.invalidInput;
    this.projectId = this.route.snapshot.params['id'] || null;
    this.projectService.getProjects().subscribe(data => {
      this.project = data.find(x => x.id == Number(this.projectId))
      // debugger
    });

    this.projectService.task$.subscribe(data => {
      if (data.length) {
        const projectTask = data.filter(x => x.projectId == Number(this.projectId));
        this.tasksList = projectTask;
        this.rows = projectTask;
        this.activeStatus = null;

        // console.log('this.rows', this.rows);

      }
    });

    // this.initializeForm();

  };



  //  {
  //       "id": 103,
  //       "projectId": 2,
  //       "title": "Beta test with internal team",
  //       "assignee": "Olivia",
  //       "dueDate": "2025-06-28",
  //       "status": "Completed",
  //       "priority": "High"
  //     }, 

  // initializeForm() {
  //   // Project Name, Description, Owner, Status (Active/Completed)
  //   this.taskForm = new FormGroup({
  //     id: new FormControl('', []),
  //     projectId: new FormControl(Number(this.projectId), []),
  //     title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //     assignee: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //     dueDate: new FormControl(new Date, [Validators.required]),
  //     status: new FormControl('Active', [Validators.required]),
  //     priority: new FormControl('High', [Validators.required]),
  //   });
  // }

  generateNumericId(length: number = 6): number {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  closeModal() {
    this.isVisible = false;
  }

  saveTask(event: any) {
    this.commonService.showLoader();
    const rand_id = this.generateNumericId(3);
    let reqBody = { ...event, id: rand_id };

    setTimeout(() => {
      this.projectService.addTaskUpdateProjectList(this.projectId, reqBody);
      this.isVisible = false;
      this.commonService.hideLoader();
      this.toastService.showToast('success', 'Success', 'Task Added successfully');
    }, 1000);

    // return

    // const check = this.taskForm.value?.id;
    // let req = { ...this.taskForm.value };
    // if (!check) {
    //   req.id = rand_id;
    // }
    // setTimeout(() => {
    //   check ? this.projectService.updateProject(req) :
    //     this.projectService.addProject(req);
    //   this.isVisible = false;
    //   this.commonService.hideLoader();
    //   this.toastService.showToast('success', 'Success', check ? 'project updated successfully' : 'project added successfully');
    // }, 1000);


  }

  toEdit(event: any) {
    // const updatedTask = event;
    // console.log('Task updated:', updatedTask);
    // Save to backend here
  }

  filterByStatus(event: any) {
    if (event && event.value) {
      this.rows = this.tasksList.filter((x: any) => x.status == event.value);

    } else {
      this.rows = [...this.tasksList];
    }

  }

  openModal() {
    // this.taskForm.reset();
    this.isVisible = true;
    // this.initializeForm();
  }
}
