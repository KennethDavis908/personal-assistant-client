import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { Note } from '../models/note';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

  public upsertTask(note: Note): Observable<Note> {
    return this.http.put<Note>(environment.personalAssistantApi.note.upsert, note).pipe(
      catchError((error) => {
        this.toastService.error(
          `Failed to save note due to HTTP ${error.status}`,
          'Error Saving Note'
        );
        throw error;
      })
    )
  }

  public getByDate(date: Date): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.personalAssistantApi.note.getByDate}/${date.toISOString().split('T')[0]}`).pipe(
      catchError((error) => {
        this.toastService.error(
          `Failed to retrieve notes due to HTTP ${error.status}`,
          'Error retrieving Notes'
        );
        throw error
      })
    )
  }
}
