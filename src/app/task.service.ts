import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  uri = "http://localhost:9001";

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(`${this.uri}/tasks`);
  }

  getTaskById(id) {
    return this.http.get(`${this.uri}/tasks/${id}`);
  }

  addTask(task, start_date, end_date, priority, status, parent, project, user) {
    if (priority === undefined) {
      priority = "10";
    }
    let Task = {
      task: task,
      start_date: start_date,
      end_date: end_date,
      priority: priority,
      status: status,
      project: project,
      user: user
    };
    if (parent != undefined) {
      Task[parent] = parent;
    }
   return this.http.post(`${this.uri}/task/add`, Task);
  }

  editTask(id, task, start_date, end_date, priority, status, parent, project, user) {
    if (priority === undefined) {
       priority = "10";
    }
    let Task = {
      task: task,
      start_date: start_date,
      end_date: end_date,
      priority: priority,
      status: status,
      project: project,
      user: user
    };
    if (parent != undefined) {
      Task[parent] = parent;
    }
    return this.http.post(`${this.uri}/task/update/${id}`, Task);
  }  

  deleteTask(id) {
    return this.http.get(`${this.uri}/task/delete/${id}`);
  }

  endTask(id) {
    return this.http.get(`${this.uri}/task/endtask/${id}`);
  }

}
