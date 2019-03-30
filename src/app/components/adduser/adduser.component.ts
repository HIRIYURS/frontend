import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router: Router) {
    this.userForm = this.fb.group({
                            firstname: ['', Validators.required],
                            lastname: '',
                            employeeid: ''
                      });    
  }

  createTask(firstname, lastname, employeeid) {
    let status: boolean = false;
    this.userService.addUser(firstname, lastname, employeeid).subscribe(() => {
      this.router.navigate(['/adduser']);
    });
  }  

  ngOnInit() {
  }
}
