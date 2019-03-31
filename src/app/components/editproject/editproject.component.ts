import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {
  id: string;  
  //projectForm: FormGroup;
  projectForm = new FormGroup ({
    project_name: new FormControl(),
    user: new FormControl(),
    start_date: new FormControl(),
    end_date: new FormControl(),
    priority: new FormControl()
  });
  project: Project;
  user: User;
  users: User[];

  constructor(private projectService: ProjectService,
              private userService: UserService,
              private fb: FormBuilder, 
              private router: Router,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) { 
    this.createForm();   
  }

  createForm() {
    this.projectForm = this.fb.group({
      project_name: ['', Validators.required],
      user: '',
      start_date: '',
      end_date: '',
      priority: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.id = params.id;
        this.projectService.getProjectById(this.id).subscribe((res: Project) => {
          this.project = res;
          this.projectForm.get('project_name').setValue(this.project.project_name);       
        
          this.projectForm.get('priority').setValue(this.project.priority);
          this.projectForm.get('start_date').setValue(this.project.start_date);
          this.projectForm.get('end_date').setValue(this.project.end_date);
        
          if (this.project.user != undefined) {
            this.userService.getUserById(this.project.user).subscribe((data: User) => {
              this.user = data;
              this.projectForm.get('user').setValue(this.user.first_name);
            });
          }
        });
      }
    });
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });    
  }

  updateProject(projectname, userid, startdate, enddate, priority) {
    let tmpUser = this.users.filter((luser) => luser._id === userid);
    console.log("project: ", this.project);
    console.log("userid: ", userid);
    console.log("tmpUser: ", tmpUser);
    console.log("projectname: ", projectname);
    this.projectService.editProject(this.project._id, projectname, tmpUser[0]._id, startdate, enddate, priority).subscribe(() => {
      this.snackBar.open('Project updated Successfully!', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/addproject']);
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
