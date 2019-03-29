import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
//import {formatDate } from '@angular/common';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Task } from '../../task.model';
import { Project } from '../../project.model';
import { ParentTask } from '../../parent.model';

import { TaskService } from '../../task.service';
import { ProjectService } from '../../project.service';
import { ParentService } from '../../parent.service';

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

  constructor(private taskService: TaskService, 
              private projectService: ProjectService,
              private parentService: ParentService,
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


  editTask(id) {
    console.log("Edit Task: ", id);
    //this.router.navigate([`/edittask/${id}`]);
  }

  finishTask(id) {
    // this.taskService.endTask(id).subscribe(() => {
    //   this.fetchTasks();
    // });
    console.log("Finish Task: ", id);
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
          });

          this.dataSource = new MatTableDataSource(this.taskList);
        });

  }

}
