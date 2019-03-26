import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
//import {formatDate } from '@angular/common';

import { Task } from '../../task.model';
import { Project } from '../../project.model';

import { TaskService } from '../../task.service';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  projects: Project[];
  tasks: Task[];
  displayedColumns = ['task', 'parent', 'user', 'start_date', 'end_date', 'priority', 'actions'];
  dataSource: any;

  filterValues = {
    project: ''
  };

  constructor(private taskService: TaskService, 
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit() {
    // this.taskService.getTasks().subscribe((tasks) => {
    //   console.log(tasks);
    // });
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService
      .getProjects()
        .subscribe((data: Project[]) => {
          this.projects = data;
          // this.tasks.forEach((tmptask: Task) => {
          //   //this.taskService.getTaskById('5c3c1678d104e54960669eb8').subscribe((res: Task) => {
          //     if (tmptask.parent !== undefined) {
          //       this.taskService.getTaskById(tmptask.parent).subscribe((res: Task) => {  
          //         var restask: Task;
          //         restask = res;
          //         tmptask.parent = restask.task;
          //     });
          //   }
          // });
          // console.log("Data requested...");
          console.log(this.projects);
          this.dataSource = new MatTableDataSource(this.projects);
          this.dataSource.filterPredicate = this.taskFilterPredicate;
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

  taskFilterPredicate(data: Project, filter: string) {
    var searchTerms = JSON.parse(filter);

    return (data.project_name.toLowerCase().indexOf(searchTerms.project_name) !== -1);

  }  

  editTask(id) {
    this.router.navigate([`/edittask/${id}`]);
  }

  finishTask(id) {
    // this.taskService.endTask(id).subscribe(() => {
    //   this.fetchTasks();
    // });
  }  

  applyProjectFilter(filterValue: string) {
    //this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterValues.project = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterValues).toLowerCase();

  }
}
