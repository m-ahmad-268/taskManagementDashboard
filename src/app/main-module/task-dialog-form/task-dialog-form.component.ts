import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-task-dialog-form',
  templateUrl: './task-dialog-form.component.html',
  styleUrls: ['./task-dialog-form.component.scss']
})
export class TaskDialogFormComponent implements OnInit, OnChanges {

  @Input() isModalVisible: boolean = false;
  @Input() projectId = '';
  @Output() submitTaskFormValue = new EventEmitter<Task>();
  @Output() setCloseModal = new EventEmitter<boolean>();
  taskForm!: FormGroup;
  invalidText = '';
  arrStatus = [
    'Active', 'Pending', 'In Progress', 'Completed',
  ];
  arrPriority = [
    'High', 'Medium', 'Low'
  ];

  constructor(
    private commonService: CommonService,
  ) {


  }

  saveTask() {
    if (this.taskForm.valid) {
      this.submitTaskFormValue.emit(this.taskForm.value);
    }
  }

  ngOnInit(): void {
    this.invalidText = this.commonService.invalidInput;
    this.initializeForm();

  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isModalVisible'].currentValue) {
      this.initializeForm();
    }
  }

  closeModal() {
    this.taskForm.reset();
    this.isModalVisible = false;
    this.setCloseModal.emit(false);
  }



  initializeForm() {
    // debugger
    // Project Name, Description, Owner, Status (Active/Completed)
    this.taskForm = new FormGroup({
      id: new FormControl('', []),
      projectId: new FormControl(Number(this.projectId), []),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      assignee: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dueDate: new FormControl(new Date, [Validators.required]),
      status: new FormControl('Active', [Validators.required]),
      priority: new FormControl('High', [Validators.required]),
    });
  }
}
