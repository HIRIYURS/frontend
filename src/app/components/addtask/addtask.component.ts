import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TaskService } from '../../task.service';
import { ParentService } from '../../parent.service';
import { ProjectService } from '../../project.service';
import { UserService } from '../../user.service';

import { Task } from '../../task.model';
import { ParentTask } from '../../parent.model';
import { Project } from '../../project.model';
import { User } from '../../user.model';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  createForm: FormGroup;
  parents: ParentTask[];
  projects: Project[];
  users: User[];

  constructor(private taskService: TaskService, 
              private parentService: ParentService,
              private projectService: ProjectService,
              private userService: UserService,
              private fb: FormBuilder, 
              private router: Router) {
    this.createForm = this.fb.group({
                            task: ['', Validators.required],
                            project: '',
                            user: '',
                            start_date: '',
                            end_date: '',
                            parent: '',
                            priority: 15
                      });    
  }

  createTask(task, start_date, end_date, priority, parent, project, user) {
    let status: boolean = false;
    this.taskService.addTask(task, start_date, end_date, priority, status, parent, project, user).subscribe(() => {
      this.router.navigate(['/viewtask']);
    });
  }  

  ngOnInit() {
    this.parentService.getParentTasks().subscribe((data: ParentTask[]) => {
      this.parents = data;
    });
    this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects= data;
    });
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });            
  }

}
