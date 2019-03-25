import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log(tasks);
    });
  }

}
