import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  uri = "http://localhost:9001";

  constructor(private http: HttpClient) { }

  getParentTasks() {
    return this.http.get(`${this.uri}/parenttasks`);
  }

  getParentTaskById(id) {
    return this.http.get(`${this.uri}/parenttasks/${id}`);
  }  
}
