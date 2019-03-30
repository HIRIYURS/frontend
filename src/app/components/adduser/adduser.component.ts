import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../../user.service';

import { User } from '../../user.model';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  userForm: FormGroup;
  users: User[];

  constructor(private userService: UserService,
              private fb: FormBuilder, 
              private router: Router,
              private snackBar: MatSnackBar) {
    this.refreshForm();
  }

  refreshForm() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: '',
      employeeid: ''
    });    
  }

  createUser(firstname, lastname, employeeid) {
    this.userService.addUser(firstname, lastname, employeeid).subscribe(() => {
      this.snackBar.open('User Added Successfully!', 'OK', {
        duration: 3000
      });
      this.refreshForm();
      this.router.navigate(['/adduser']);
    });
  }  

  ngOnInit() {
  }
}
