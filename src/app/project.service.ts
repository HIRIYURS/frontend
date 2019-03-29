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
}
