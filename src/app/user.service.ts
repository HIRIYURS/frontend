import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = "http://localhost:9001";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getUserById(id) {
    return this.http.get(`${this.uri}/users/${id}`);
  }  

  addUser(firstname, lastname, employeeid) {
    let tmpuser: any;
    tmpuser = {
        first_name: firstname,
        last_name: lastname,
        employee_id: employeeid
    };
    return this.http.post(`${this.uri}/user/add`, tmpuser);
  }

  editUser(id, firstname, lastname, employeeid) {
    let User = {
      first_name: firstname,
      last_name: lastname,
      employee_id: employeeid
    };
    return this.http.post(`${this.uri}/user/update/${id}`, User);
  }  

  deleteUser(id) {
    return this.http.get(`${this.uri}/user/delete/${id}`);
  }

}
