import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
              private snackBar: MatSnackBar,
              private router: Router) {
    this.refreshForm();
  }

  refreshForm() {
    let curDate = new Date();
    curDate.setDate(curDate.getDate() + 1);
    this.createForm = this.fb.group({
      task: ['', Validators.required],
      project: '',
      user: '',
      start_date: new Date(),
      end_date: curDate,
      parent: '',
      priority: 15
    });    
  }

  createTask(task, start_date, end_date, priority, parent, project, user) {
    let status: boolean = false;
    this.taskService.addTask(task, start_date, end_date, priority, status, parent, project, user).subscribe(() => {
      this.snackBar.open('User Added Successfully!', 'OK', {
        duration: 3000
      });
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

  myEndDateFilter = (pDay: Date): boolean => {
    let myCond: boolean;
    //let sDate: Date = new Date(this.task.start_date);
    let sDate: Date = new Date(this.createForm.get('start_date').value);
    if (pDay.getTime() > sDate.getTime()) {
      myCond = true;
    } else {
      myCond = false;
    }
    return myCond;
  }

  myStartDateFilter = (pDay: Date): boolean => {
    let myCond: boolean;
    //let eDate: Date = new Date(this.task.end_date);
    let eDate: Date = new Date(this.createForm.get('end_date').value);
    if (pDay.getTime() < eDate.getTime()) {
      myCond = true;
    } else {
      myCond = false;
    }
    return myCond;
  }  
}
