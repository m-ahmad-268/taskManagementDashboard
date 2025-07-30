import { Injectable } from '@angular/core';
import { Project } from '../models/projects';
import { Task } from '../models/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects = new BehaviorSubject<Project[]>([
    {
      "id": 1,
      "name": "Website Redesign",
      "owner": "Alice",
      "status": "Active",
      "description": "Rev	amp company website for Q3",
      "tasks": [101, 102]
    },
    {
      "id": 2,
      "name": "Mobile App Launch",
      "owner": "Bob",
      "status": "Completed",
      "description": "Launch Android and iOS versions",
      "tasks": [103, 104, 105]
    }
  ]);
  projects$ = this.projects.asObservable();

  private tasks = new BehaviorSubject<Task[]>([
    {
      "id": 101,
      "projectId": 1,
      "title": "Wireframe new homepage",
      "assignee": "Emma",
      "dueDate": "2025-07-10",
      "status": "In Progress",
      "priority": "High"
    },
    {
      "id": 102,
      "projectId": 1,
      "title": "Get stakeholder approval",
      "assignee": "Liam",
      "dueDate": "2025-07-12",
      "status": "Pending",
      "priority": "Medium"
    },
    {
      "id": 103,
      "projectId": 2,
      "title": "Beta test with internal team",
      "assignee": "Olivia",
      "dueDate": "2025-06-28",
      "status": "Completed",
      "priority": "High"
    },
    {
      "id": 104,
      "projectId": 2,
      "title": "Fix reported bugs",
      "assignee": "Noah",
      "dueDate": "2025-06-29",
      "status": "Completed",
      "priority": "High"
    },
    {
      "id": 105,
      "projectId": 2,
      "title": "Submit to app stores",
      "assignee": "Ava",
      "dueDate": "2025-07-01",
      "status": "Completed",
      "priority": "Medium"
    }
  ]);

  task$ = this.tasks.asObservable();

  constructor() { }


  getProjects() {
    return this.projects$;
  };

  addProject(activeProject: Project) {
    const updateArray = [...this.projects.value, activeProject];
    this.projects.next(updateArray);
  }

  updateProject(activeProject: Project) {
    const updateArray = this.projects.value.map(p =>
      p.id === activeProject.id ? activeProject : p
    );
    this.projects.next(updateArray);
  }

  deleteProject(id: number) {
    const updateArray = this.projects.value.filter(p => p.id !== id);
    this.projects.next(updateArray);
  }

  deleteTask(projectId: number) {
    const updateArray = this.tasks.value.filter(p => p.projectId !== projectId);
    this.tasks.next(updateArray);
  }

  addTaskUpdateProjectList(projectId: number, activeTask: Task) {
    const updatedTasks = [...this.tasks.value, activeTask];

    const updatedArray = this.projects.value.map(project => {
      if (project.id == projectId) {
        return {
          ...project,
          tasks: [...project.tasks, activeTask.id]
        };
      }
      return project;
    });

    this.projects.next(updatedArray);
    this.tasks.next(updatedTasks);
  }


  getTasks() {
    return this.task$;
  };
}
