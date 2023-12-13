import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ToDoList } from 'src/app/models/to-do-list';
import { TaskService } from 'src/app/services/task.service';
import { ToDoListService } from 'src/app/services/to-do-list.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  toDoList: ToDoList;
  toDoListLoading: boolean = true;

  constructor(
    private toDoListService: ToDoListService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.toDoListService.getByDate(new Date()).subscribe(
      {
        next: (toDoList) => {
          if (toDoList.id) this.toDoList = toDoList;
          this.toDoListLoading = false
        },
        error: (error) => {
          this.toDoListLoading = false
        }
      }
    )
  }

  addNewTask(task: Task) {
    this.taskService.upsertTask(task).subscribe(
      (result: Task) => {
        this.toDoList.tasks.push(result)
      }
    )
  }
}
