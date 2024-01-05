import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ToDoList } from 'src/app/models/to-do-list';
import { MatDialog } from '@angular/material/dialog';
import { NewToDoListItemDialogComponent } from './new-to-do-list-item-dialog/new-to-do-list-item-dialog.component';
import { TaskService } from 'src/app/services/task.service';
import { ToDoListService } from 'src/app/services/to-do-list.service';

@Component({
  selector: 'app-daily-to-do',
  templateUrl: './daily-to-do.component.html',
  styleUrls: ['./daily-to-do.component.css']
})
export class DailyToDoComponent {
  toDoList: ToDoList
  loading: boolean = true

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private toDoListService: ToDoListService,
  ) {}

  ngOnInit(): void {
    this.toDoListService.getByDate(new Date()).subscribe(
      {
        next: (toDoList) => {
          if (toDoList.id) this.toDoList = toDoList;
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      }
    )
  }

  addNewToDoListItem = (): void => {
    const dialogRef = this.dialog.open(NewToDoListItemDialogComponent);

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        result.toDoListId = this.toDoList.id
        this.upsertTask(result)
      }
    });
  }

  upsertTask = (task: Task) => {
    this.taskService.upsertTask(task).subscribe(
      (result: Task) => {
        if (task.id) {
          this.toDoList.tasks = this.toDoList.tasks.map(
            existingTask => {
              if(result.id === existingTask.id) return result
              return existingTask
            }
          )
        } else {
          this.toDoList.tasks.push(result)
        }
      }
    )
  }

  updateTaskCompleted = (task: Task): void => {
    this.upsertTask({...task, complete: !task.complete})
  }
}
