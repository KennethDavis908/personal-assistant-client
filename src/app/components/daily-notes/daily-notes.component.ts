import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/models/note';
import { NewNoteDialogComponent } from './new-note-dialog/new-note-dialog.component';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-daily-notes',
  templateUrl: './daily-notes.component.html',
  styleUrls: ['./daily-notes.component.css']
})
export class DailyNotesComponent {
  loading: boolean = true;
  notes: Note[];

  constructor(
    public dialog: MatDialog,
    public noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.noteService.getByDate(new Date()).subscribe(
      {
        next: (notes: Note[]) => {
          if (notes.length) this.notes = notes;
          else this.notes = [];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      }
    )
  }

  addNewNote = (): void => {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result) {
        this.upsertNote(result)
      }
    });
  }

  upsertNote = (note: Note) => {
    this.noteService.upsertTask(note).subscribe(
      (result: Note) => {
        this.notes.push(result)
      }
    )
  }
}
