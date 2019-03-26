import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  uri = "http://localhost:9001";

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(`${this.uri}/projects`);
  }
}
