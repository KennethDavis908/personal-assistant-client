import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ToDoList } from 'src/app/models/to-do-list';
import { MatDialog } from '@angular/material/dialog';
import { NewToDoListItemDialogComponent } from '../new-to-do-list-item-dialog/new-to-do-list-item-dialog.component';

const task1: Task = new Task(1, "Task 1", false, 1);
const task2: Task = new Task(2, "Task 2", true, 1);
const task3: Task = new Task(3, "Task 3", false, 1);
const toDOListMock: ToDoList = new ToDoList(1, new Date(), [task1, task2, task3]);

@Component({
  selector: 'app-daily-to-do',
  templateUrl: './daily-to-do.component.html',
  styleUrls: ['./daily-to-do.component.css']
})
export class DailyToDoComponent {
  toDOList: ToDoList = toDOListMock
  tasks: Task[] = this.toDOList.tasks

  constructor(public dialog: MatDialog) {}

  addNewToDoListItem = (): void => {
    const dialogRef = this.dialog.open(NewToDoListItemDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      result? this.tasks.push(result): null
    });
  }
}
