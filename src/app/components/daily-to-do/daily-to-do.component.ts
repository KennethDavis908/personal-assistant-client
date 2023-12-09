import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ToDoList } from 'src/app/models/to-do-list';
import { MatDialog } from '@angular/material/dialog';
import { NewToDoListItemDialogComponent } from '../new-to-do-list-item-dialog/new-to-do-list-item-dialog.component';

@Component({
  selector: 'app-daily-to-do',
  templateUrl: './daily-to-do.component.html',
  styleUrls: ['./daily-to-do.component.css']
})
export class DailyToDoComponent {
  @Input() toDoList: ToDoList
  @Output() newTaskEvent = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  addNewToDoListItem = (): void => {
    const dialogRef = this.dialog.open(NewToDoListItemDialogComponent);

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        result.toDoListId = this.toDoList.id
        this.newTaskEvent.emit(result)
      }
    });
  }
}
