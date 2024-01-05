import { Component, Input } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent {

  @Input("note") note: Note
}
