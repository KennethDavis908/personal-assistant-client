import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToDoList } from '../models/to-do-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  public getByDate(date: Date): Observable<ToDoList> {
    return this.http.get<ToDoList>(`${environment.personalAssistantApi.toDoList.getByDate}/${date.toISOString().split('T')[0]}`).pipe(
      catchError((error) => {
        this.toastService.error(
          `Failed to retrieve to do list due to HTTP ${error.status}`,
          'Error retrieving To Do List'
        );
        throw error
      })
    )
  }
}
