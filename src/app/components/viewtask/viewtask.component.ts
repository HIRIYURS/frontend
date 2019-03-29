import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
//import {formatDate } from '@angular/common';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Task } from '../../task.model';
import { Project } from '../../project.model';
import { ParentTask } from '../../parent.model';
import { User } from '../../user.model';

import { TaskService } from '../../task.service';
import { ProjectService } from '../../project.service';
import { ParentService } from '../../parent.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  projectForm: FormGroup = this.fb.group({
    ProjectName: '',
  });
  myControl = new FormControl();
  filteredOptions: Observable<Project[]>;  
  projects: Project[];
  selectedProj: string;
  tasks: Task[];
  taskList: Task[];
  displayedColumns = ['task', 'parent', 'user', 'start_date', 'end_date', 'priority', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TaskService, 
              private projectService: ProjectService,
              private parentService: ParentService,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    // this.taskService.getTasks().subscribe((tasks) => {
    //   console.log(tasks);
    // });
    this.fetchProjects();
  }

  private _filter(value: string): Project[] {
    const filterValue = value.toLowerCase();
    let tmpProjs: Project[];

    if (value) {
      tmpProjs = this.projects.filter((lproj) => lproj.project_name.toLowerCase().includes(filterValue));
    } else {
      tmpProjs = this.projects;
    }
    return tmpProjs;
  }

  fetchProjects() {
    this.projectService
      .getProjects()
        .subscribe((data: Project[]) => {
          this.projects = data;
          // console.log("Data requested...");
          console.log("Projects: ", this.projects);
          this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        });  
  }

  formatDate(date: Date): string {
    // const day = date.getDate();
    // const month = date.getMonth();
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return `01/16/2019`;
    //return formatDate(date, "MM/DD/YYYY");
  }


  editTask(taskname) {
    console.log("Edit Task: ", taskname);
    let selectedTask = this.taskList.filter((ltask) => ltask.task.includes(taskname));
    console.log("Edit Task: ", selectedTask[0]._id);
    this.router.navigate([`/edittask/${selectedTask[0]._id}`]);
  }

  finishTask(taskname) {
    console.log("Edit Task: ", taskname);
    let selectedTask = this.taskList.filter((ltask) => ltask.task.includes(taskname));
    console.log("End Task: ", selectedTask[0]._id);
    this.taskService.endTask(selectedTask[0]._id).subscribe(() => {
      //this.fetchTasks();
     });
  }  

  getProjectTasks(projectName) {
    let tmpProj: Project[];
    console.log("get Project Tasks for Project: ", projectName);
    tmpProj = this.projects.filter((lproj) => lproj.project_name.includes(projectName));
    console.log("tmpProj: ", tmpProj);
    console.log("tmpProj._id: ", tmpProj[0]._id);
    this.taskService
      .getTasksByProjectID(tmpProj[0]._id)
        .subscribe((data: Task[]) => {
          this.taskList = data;
          console.log("this.taskList: ", this.taskList);
          
          this.taskList.forEach((tmptask: Task) => {
              if (tmptask.parent !== undefined) {
                this.parentService.getParentTaskById(tmptask.parent).subscribe((res: ParentTask) => {  
                  tmptask.parent = res.parent_task;
                });
              }
              if (tmptask.user !== undefined) {
                this.userService.getUserById(tmptask.user).subscribe((res: User) => {  
                  tmptask.user = res.first_name;
                });
              }
          });

          this.dataSource = new MatTableDataSource(this.taskList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

  }

}
