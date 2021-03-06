import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../../user.service';

import { User } from '../../user.model';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  id: string;  
  userForm: FormGroup;
  user: User;

  constructor(private userService: UserService,
              private fb: FormBuilder, 
              private router: Router,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
    this.userForm = this.fb.group({
                            firstname: ['', Validators.required],
                            lastname: '',
                            employeeid: ''
                      });    
  }

  updateUser(firstname, lastname, employeeid) {
    let status: boolean = false;
    this.userService.editUser(this.user._id, firstname, lastname, employeeid).subscribe(() => {
      this.snackBar.open('User updated Successfully!', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/adduser']);
    });
  }  

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== undefined) {
        this.id = params.id;
        this.userService.getUserById(this.id).subscribe((res: User) => {
          this.user = res;
          this.userForm.get('firstname').setValue(this.user.first_name);       
          this.userForm.get('lastname').setValue(this.user.last_name);
          this.userForm.get('employeeid').setValue(this.user.employee_id);
        });
      }
    });    
  }
}
