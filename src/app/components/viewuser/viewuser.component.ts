import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
//import {formatDate } from '@angular/common';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { User } from '../../user.model';

import { UserService } from '../../user.service';


@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {
  userForm: FormGroup = this.fb.group({
    userName: '',
  });
  myControl = new FormControl();
  filteredOptions: Observable<User[]>;  
  userList: User[];
  users: User[];
  displayedColumns = ['firstname', 'lastname', 'employeeid', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, 
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    // this.taskService.getTasks().subscribe((tasks) => {
    //   console.log(tasks);
    // });
    this.fetchUsers();
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    let tmpUsers: User[];

    if (value) {
      tmpUsers = this.users.filter((luser) => luser.first_name.toLowerCase().includes(filterValue));
    } else {
      tmpUsers = this.users;
    }
    return tmpUsers;
  }

  fetchUsers() {
    this.userService
      .getUsers()
        .subscribe((data: User[]) => {
          this.users = data;
          this.userList = data;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      
          // console.log("Data requested...");
          //console.log("Users: ", this.users);
          this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        });  
  }

  getUsers(userName) {
    //let tmpUser: User[];
    this.userList = this.users.filter((luser) => luser.first_name.includes(userName));

    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }
  
  editUser(username) {
    console.log("Edit User: ", username);
    let selectedUser = this.userList.filter((luser) => luser.employee_id === username);
    console.log("Edit User: ", selectedUser[0]._id);
    this.router.navigate([`/edituser/${selectedUser[0]._id}`]);
  }

  deleteUser(username) {
    console.log("Delete User: ", username);
    let selectedUser = this.userList.filter((luser) => luser.employee_id === username);
    console.log("Delete User: ", selectedUser[0]._id);
    this.userService.deleteUser(selectedUser[0]._id).subscribe(() => {
      //this.fetchTasks();
    });
    this.router.navigate([`/adduser`]);
  }    
}
