import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  id: string;
  task: Task;
  //updateForm: FormGroup;
  updateForm = new FormGroup ({
    task: new FormControl(),
    project: new FormControl(),
    user: new FormControl(),
    startdate: new FormControl(),
    enddate: new FormControl(),
    parent: new FormControl(),
    priority: new FormControl()
  });

  parent: ParentTask;
  parentname: string;
  user: User;
  username: string;
  project: Project;
  projectname: string;

  minDate = new Date(2010, 0, 1);
  maxDate = new Date(2025, 0, 1);

  constructor(private taskService: TaskService, 
              private parentService: ParentService,
              private projectService: ProjectService,
              private userService: UserService, 
              private router: Router, 
              private route: ActivatedRoute, 
              private snackBar: MatSnackBar, 
              private fb: FormBuilder) {
    this.createForm();
  }

  myEndDateFilter = (pDay: Date): boolean => {
    let myCond: boolean;
    //let sDate: Date = new Date(this.task.start_date);
    let sDate: Date = new Date(this.updateForm.get('startdate').value);
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
    let eDate: Date = new Date(this.updateForm.get('enddate').value);
    if (pDay.getTime() < eDate.getTime()) {
      myCond = true;
    } else {
      myCond = false;
    }
    return myCond;
  }  

  createForm() {
    this.updateForm = this.fb.group({
      task: ['', Validators.required],
      project: '',
      user: '',
      startdate: '',
      enddate: '',
      parent: '',
      priority: ''
    });
  }


  ngOnInit() {
    if (this.route !== undefined) {
      this.route.params.subscribe(params => {
        if (params.id !== undefined) {
          this.id = params.id;
          this.taskService.getTaskById(this.id).subscribe((res: Task) => {
            this.task = res;
            if (this.task.parent != undefined) {
              this.parentService.getParentTaskById(this.task.parent).subscribe((data: ParentTask) => {
                this.parent = data;
                this.updateForm.get('parent').setValue(this.parent.parent_task);
              });
            }
            if (this.task.user != undefined) {
              this.userService.getUserById(this.task.user).subscribe((data: User) => {
                this.user = data;
                this.updateForm.get('user').setValue(this.user.first_name);
              });
            }
            this.projectService.getProjectById(this.task.project).subscribe((data: Project) => {
              this.project = data;
              this.updateForm.get('project').setValue(this.project.project_name);
            });
            this.updateForm.get('task').setValue(this.task.task);

        
            this.updateForm.get('startdate').setValue(this.task.start_date);
            this.updateForm.get('enddate').setValue(this.task.end_date);
            this.updateForm.get('priority').setValue(this.task.priority);
        
            if (this.task.status === true) {
              this.updateForm.disable();
            }
          });
        }
      });
    }
  }

  updateTask(pTaskname, startdate, enddate, priority) {
    let lParent: string = "";
    let lUser: string = "";
    if (this.parent != undefined) {
      lParent = this.parent._id;
    }
    if (this.user != undefined) {
      lUser = this.user._id;
    }
    this.taskService.editTask(this.id, pTaskname, startdate, enddate, priority, false, lParent, this.project._id, lUser).subscribe(() => {
      this.snackBar.open('Task updated Successfully!', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/viewtask']);
    });
  }  

}
