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
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  projectForm: FormGroup;
  project: Project;
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
    this.projectForm = this.fb.group({
      project_name: ['', Validators.required],
      user: '',
      start_date: new Date(),
      end_date: curDate,
      priority: 15
    });
  }

  createProject(projectname, username, startdate, enddate, priority) {
    let status: boolean = false;
    this.projectService.addProject(projectname, username, startdate, enddate, priority).subscribe(() => {
      this.snackBar.open('Project Added Successfully!', 'OK', {
        duration: 3000
      });
      this.refreshForm();
      this.router.navigate(['/addproject']);
    });
  }    
  ngOnInit() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });  
  }

  myEndDateFilter = (pDay: Date): boolean => {
    let myCond: boolean;
    //let sDate: Date = new Date(this.task.start_date);
    let sDate: Date = new Date(this.projectForm.get('start_date').value);
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
    let eDate: Date = new Date(this.projectForm.get('end_date').value);
    if (pDay.getTime() < eDate.getTime()) {
      myCond = true;
    } else {
      myCond = false;
    }
    return myCond;
  }  


}
