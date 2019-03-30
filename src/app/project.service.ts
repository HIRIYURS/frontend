import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  uri = "http://localhost:9001";

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(`${this.uri}/projects`);
  }

  getProjectById(id) {
    return this.http.get(`${this.uri}/projects/${id}`);
  }

  addProject(projectname, user, start_date, end_date, priority) {
    let tmpproject: any;
    if (priority === undefined) {
      priority = "10";
    }
    if (user !== undefined) {
      tmpproject = {
        project_name: projectname,
        user: user,
        start_date: start_date,
        end_date: end_date,
        priority: priority
      };
    } else {
      tmpproject = {
        project_name: projectname,
        start_date: start_date,
        end_date: end_date,
        priority: priority
      };
    }

   return this.http.post(`${this.uri}/project/add`, tmpproject);
  }

  editProject(id, projectname, user, start_date, end_date, priority) {
    let tmpproject: any;
    if (priority === undefined) {
       priority = "10";
    }
    if (user !== undefined) {
      tmpproject = {
        project_name: projectname,
        user: user,
        start_date: start_date,
        end_date: end_date,
        priority: priority
      };
    } else {
      tmpproject = {
        project_name: projectname,
        start_date: start_date,
        end_date: end_date,
        priority: priority
      };
    }
    return this.http.post(`${this.uri}/project/update/${id}`, tmpproject);
  }  


  deleteProject(id) {
    return this.http.get(`${this.uri}/project/delete/${id}`);
  }
}
