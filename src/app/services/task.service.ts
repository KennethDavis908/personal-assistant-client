import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Task } from '../models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  public upsertTask(task: Task): Observable<Task> {
    return this.http.put<Task>(environment.personalAssistantApi.task.upsert, task).pipe(
      catchError((error) => {
        this.toastService.error(
          `Failed to save task due to HTTP ${error.status}`,
          'Error Saving Task'
        );
        return of(task);
      })
    )
  }
}
