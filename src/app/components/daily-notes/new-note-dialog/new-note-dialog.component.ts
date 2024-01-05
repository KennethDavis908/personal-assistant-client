import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Note } from 'src/app/models/note';

/** Error when invalid control is dirty, touched, or submitted. */
class NoteErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const validateNoteBody = (control: AbstractControl<string>): ValidationErrors | null => {
  if (control.value === '') return {empty: true}
  else return null
}



@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.css']
})
export class NewNoteDialogComponent {

  noteBodyFormControl = this.formBuilder.nonNullable.control<string>('', [Validators.required, validateNoteBody])
  noteTitleFormControl = this.formBuilder.control<string>('');

  matcher = new NoteErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<NewNoteDialogComponent>,
    public formBuilder: FormBuilder
  ) {}

  @HostListener('window:keyup.Enter')
  close(): void {
    if(this.noteBodyFormControl.value) {
      this.dialogRef.close(new Note(0, this.noteTitleFormControl.value || "", this.noteBodyFormControl.value, new Date()))
    } 
    this.noteBodyFormControl.markAsTouched();
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }
}
