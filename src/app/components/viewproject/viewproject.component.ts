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
  selector: 'app-viewproject',
  templateUrl: './viewproject.component.html',
  styleUrls: ['./viewproject.component.css']
})
export class ViewprojectComponent implements OnInit {
  projectForm: FormGroup = this.fb.group({
    ProjectName: '',
  });
  myControl = new FormControl();
  filteredOptions: Observable<Project[]>;  
  projects: Project[];
  projectList: Project[];
  selectedProj: string;
  tasks: Task[];
  taskList: Task[];
  displayedColumns = ['project', 'user', 'start_date', 'end_date', 'priority', 'actions'];
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
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService
      .getProjects()
        .subscribe((data: Project[]) => {
          this.projects = data;
          this.projectList = data;
          this.dataSource = new MatTableDataSource(this.projects);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.projects.forEach((tmpProject: Project) => {
            if (tmpProject.user !== undefined) {
              this.userService.getUserById(tmpProject.user).subscribe((res: User) => {  
                tmpProject.user = res.first_name;
              });
            }
          });
      
          // console.log("Data requested...");
          //console.log("Users: ", this.users);
          this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        });  
  }  

  private _filter(value: string): Project[] {
    const filterValue = value.toLowerCase();
    let tmpProjects: Project[];

    if (value) {
      tmpProjects = this.projects.filter((lproject) => lproject.project_name.toLowerCase().includes(filterValue));
    } else {
      tmpProjects = this.projects;
    }
    return tmpProjects;
  }

  getProjects(projectName) {
    //let tmpUser: User[];
    this.projectList = this.projects.filter((lproject) => lproject.project_name.includes(projectName));

    this.dataSource = new MatTableDataSource(this.projectList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }  

  editProject(projectname) {
    console.log("Edit Project: ", projectname);
    let selectedProject = this.projectList.filter((lproject) => lproject.project_name.includes(projectname));
    console.log("Edit Project: ", selectedProject[0]._id);
    this.router.navigate([`/editproject/${selectedProject[0]._id}`]);
  }

  deleteProject(projectname) {
    console.log("Suspend Project: ", projectname);
    let selectedProject = this.projectList.filter((lproject) => lproject.project_name.includes(projectname));
    console.log("Suspend Project: ", selectedProject[0]._id);
    this.projectService.deleteProject(selectedProject[0]._id).subscribe(() => {
      //this.fetchProjects();
    });
    this.router.navigate([`/addproject/${selectedProject[0]._id}`]);
  }
}
